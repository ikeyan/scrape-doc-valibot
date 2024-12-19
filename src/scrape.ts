import TurndownService from "turndown";
import puppeteer from "puppeteer";
import AsyncDisposableStack from "disposablestack/AsyncDisposableStack";
import { dirname, join, relative } from "node:path";
import { setTimeout } from "node:timers/promises";
import {
	getDocPageMarkdownFilePath,
	tryReadDocPage,
	writeDocPage,
	type DocPageMeta,
} from "./site.js";

await using stack = new AsyncDisposableStack();
const browser = await puppeteer.launch();
stack.defer(() => browser.close());
const page = await browser.newPage();
stack.defer(() => page.close());

// const websiteRoot = "https://valibot.dev";
const websiteRoot = "http://localhost:5173";

const pendingPathnameSet = new Set<string>(["/api/", "/guides/introduction/"]);
const visitedPathnameSet = new Set<string>();
const onlyPathname = (url: string | undefined) => {
	if (url === undefined) {
		return undefined;
	}
	const urlObj = new URL(url);
	if (urlObj.origin !== websiteRoot) {
		return undefined;
	}
	return urlObj.pathname;
};
for (const pathname of pendingPathnameSet) {
	if (
		[
			"/api/VariantIssue/",
			"/api/sortItem/",
			"/api/unionWithRest/",
			"/api/nonUndefinedable/",
			"/api/UnknownDataset/",
			"/api/NanoIDIssue/",
			"/api/NanoIDAction/",
			"/api/types/",
			"/thesis.pdf",
		].includes(pathname)
	)
		continue;
	let meta: DocPageMeta | undefined = (await tryReadDocPage(pathname))?.meta;
	if (meta === undefined) {
		console.log(pathname);
		const res = await page.goto(websiteRoot + pathname);
		if (res?.status() === 404) {
			continue;
		}
		visitedPathnameSet.add(pathname);
		const $article = await page.$("main article");
		if (!$article) {
			throw new Error("Article not found");
		}
		const $hiddenList = await $article.$$('[aria-hidden="true"]');
		await page.evaluate(
			(...nodes) => {
				for (const node of nodes) {
					node.remove();
				}
			},
			...$hiddenList,
		);
		const $next = await page.$('a[aria-label="Next page"]');
		const next = onlyPathname(await $next?.evaluate((node) => node.href));
		const $prev = await page.$('a[aria-label="Previous page"]');
		const prev = onlyPathname(await $prev?.evaluate((node) => node.href));
		const links = (
			await $article.evaluate((article) => {
				const anchors = article.querySelectorAll<HTMLAnchorElement>("a[href]");
				return Array.from(anchors).map((anchor) => anchor.href);
			})
		).flatMap((url) => {
			const pathname = onlyPathname(url);
			return pathname === undefined ? [] : [pathname];
		});
		meta = { url: pathname, next, prev, links };
		const html = await $article.evaluate((node) => node.innerHTML);
		const turndownService = new TurndownService({});
		turndownService.addRule("inlineLink", {
			filter: (node, options) =>
				options.linkStyle === "inlined" && node.matches("a[href]"),

			replacement: (content, node) => {
				if (!("getAttribute" in node)) {
					throw new Error("Node does not have getAttribute method");
				}
				const url = new URL(
					node.getAttribute("href") ?? "",
					websiteRoot + pathname,
				);
				let href: string;
				if (url.origin === websiteRoot) {
					const linkedMdFile = join(
						"docs",
						`${url.pathname.replace(/\/$/, "")}.md`,
					);
					href = relative(
						dirname(getDocPageMarkdownFilePath(pathname)),
						linkedMdFile,
					);
				} else {
					href = url.href;
				}
				href = href.replace(/[()]/g, "\\$0") ?? "";
				let title = (node.getAttribute("title") ?? "").replace(/\n\s+/g, "\n");
				title &&= ` "${title.replace(/"/g, '\\"')}"`;
				return `[${content}](${href}${title})`;
			},
		});
		turndownService.addRule("unlink-in-code", {
			// codeの中にaがあったらリンク解除
			filter: (node) => node.matches("code a"),
			replacement: (content) => content,
		});
		turndownService.addRule("heading", {
			filter: ["h1", "h2", "h3", "h4", "h5", "h6"],

			replacement: (content, node, options) => {
				const hLevel = Number(node.nodeName.charAt(1)) + 1;

				if (options.headingStyle === "setext" && hLevel < 3) {
					const underline = (hLevel === 1 ? "=" : "-").repeat(content.length);
					return `\n\n${content}\n${underline}\n\n`;
				}
				return `\n\n${"#".repeat(hLevel)} ${content}\n\n`;
			},
		});
		const markdown = turndownService.turndown(html);
		await writeDocPage(meta, markdown);
		await setTimeout(500);
	}
	for (const pathname of [meta.next, meta.prev, ...meta.links]) {
		if (pathname === undefined) continue;
		if (
			!visitedPathnameSet.has(pathname) &&
			!pendingPathnameSet.has(pathname)
		) {
			pendingPathnameSet.add(pathname);
		}
	}
}
