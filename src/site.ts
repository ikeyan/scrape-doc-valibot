import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import * as v from "valibot";

const vDocPageMeta = v.pipe(
	v.string(),
	v.transform((x) => JSON.parse(x)),
	v.object({
		url: v.string(),
		next: v.optional(v.pipe(v.string(), v.startsWith("/"))),
		prev: v.optional(v.pipe(v.string(), v.startsWith("/"))),
		links: v.array(v.pipe(v.string(), v.startsWith("/"))),
	}),
);
const parseDocPageMeta = v.parser(vDocPageMeta);
export type DocPageMeta = v.InferOutput<typeof vDocPageMeta>;

export const getDocPageMetaFilePath = (pathname: string) =>
	join(
		"docs",
		`${pathname.replace(/\/$/, "").replace(/\/([A-Z])/g, "/_$1")}.json`,
	);
export const getDocPageMarkdownFilePath = (pathname: string) =>
	join(
		"docs",
		`${pathname.replace(/\/$/, "").replace(/\/([A-Z])/g, "/_$1")}.md`,
	);
export interface DocPage {
	meta: DocPageMeta;
	readMarkdown(): Promise<string>;
}
export const readDocPage = async (pathname: string): Promise<DocPage> => {
	const meta = parseDocPageMeta(
		await readFile(getDocPageMetaFilePath(pathname), "utf-8"),
	);
	const readMarkdown = () =>
		readFile(getDocPageMarkdownFilePath(pathname), "utf-8");
	return { meta, readMarkdown };
};
export const tryReadDocPage = async (pathname: string) => {
	try {
		return await readDocPage(pathname);
	} catch (error) {
		if (
			!(
				typeof error === "object" &&
				error &&
				"code" in error &&
				error.code === "ENOENT"
			)
		) {
			throw error;
		}
		return null;
	}
};
export const writeDocPage = async (site: DocPageMeta, markdown: string) => {
	const mdFile = getDocPageMarkdownFilePath(site.url);
	const siteFile = getDocPageMetaFilePath(site.url);
	await mkdir(dirname(mdFile), { recursive: true });
	await writeFile(mdFile, markdown);
	await writeFile(siteFile, JSON.stringify(site, null, 2));
};
