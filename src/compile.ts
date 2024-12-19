import { writeFile } from "node:fs/promises";
import { readDocPage, tryReadDocPage } from "./site.js";

let docsMd = "# Valibot Guides and API Reference\n";
for (let pathname = "/guides/introduction/"; ; ) {
	const page = await readDocPage(pathname);
	docsMd += `${(await page.readMarkdown()).trimEnd()}\n\n`;
	if (page.meta.next === undefined) break;
	pathname = page.meta.next;
}

const apiPage = await readDocPage("/api/");
docsMd += `${(await apiPage.readMarkdown()).trimEnd()}\n\n`;
for (const pathname of apiPage.meta.links) {
	const page = await tryReadDocPage(pathname);
	if (page === null) {
		console.log(`warn: Site not found: ${pathname}`);
		continue;
	}
	docsMd += `${(await page.readMarkdown()).trimEnd()}\n\n`;
}

await writeFile("docs.md", docsMd);
