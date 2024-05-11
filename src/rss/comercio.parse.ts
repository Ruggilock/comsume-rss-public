import type { ComercioItem } from "../interface/feed";
import { readFeed } from "./rss";
import { stripHtml } from "string-strip-html";

export async function parseComercio(url: string, category: string) {
	const feed = await readFeed(url);
	const items = [];
	for (let i = 0; i < feed.length; i++) {
		const item: ComercioItem = {
			category,
			brand: "elcomercio",
			title: feed[i].title ?? "",
			link: feed[i].link ?? "",
			pubDate: feed[i].pubDate ?? "",
			description: feed[i].description ?? "",
			contentEncoded: stripHtml(feed[i]["content:encoded"]).result ?? "",
			dcCreator: feed[i]["dc:creator"] ?? "",
			guid: feed[i].guid ?? "",
			isoDate: new Date(feed[i].isoDate ?? new Date().toISOString()),
		};
		items.push(item);
	}
	return items;
}
