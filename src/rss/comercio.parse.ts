import type { ComercioItem } from "../interface/feed";
import { readFeed } from "./rss";
import { stripHtml } from "string-strip-html";

export async function parseComercio (url:string){
    const feed = await readFeed(url)
    const items = [];
    for (let i = 0; i < feed.length; i++) {
        const item: ComercioItem = {
            creator: feed[i].creator ?? "",
            title: feed[i].title ?? "",
            link: feed[i].link ?? "",
            pubDate: feed[i].pubDate ?? "",
            contentEncoded: stripHtml(feed[i]["content:encoded"]).result ?? "",
            dcCreator: feed[i]["dc:creator"] ?? "",
            content: feed[i].content ?? "",
            contentSnippet: feed[i].contentSnippet ?? "",
            guid: feed[i].guid ?? "",
            isoDate: new Date(feed[i].isoDate ?? new Date().toISOString()),
        };
        items.push(item);
    }
    return items
}


