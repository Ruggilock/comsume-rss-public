import { getLastBuildDate, updateLastBuildDate } from "../db/sqlite";
import type { Item } from "../interface/feed";
import { readFeed } from "./rss";
import { stripHtml } from "string-strip-html";


export async function parse(url: string, category: string,brand: string) {
	const feed = await readFeed(url);
	const feedItems = feed.items;
	const items = [];
	for (let i = 0; i < feedItems.length; i++) {
	
		const item: Item = {
			category,
			brand,
			title: feedItems[i].title ?? "",
			link: feedItems[i].link ?? "",
			pubDate: feedItems[i].pubDate ?? "",
			contentEncoded: stripHtml(feedItems[i]["content:encoded"]).result ?? "",
			dcCreator: feedItems[i]["dc:creator"] ?? "",
			guid: feedItems[i].guid ?? "",
			isoDate: new Date(feedItems[i].isoDate ?? new Date().toISOString()),
		};
		items.push(item);
	}
	return items;
}
