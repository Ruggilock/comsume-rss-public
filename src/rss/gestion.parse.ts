import type { ComercioItem, GestionItem } from "../interface/feed";
import { readFeed } from "./rss";
import { stripHtml } from "string-strip-html";

export async function parseGestion (url:string, category:string){
    const feed = await readFeed(url)
    const items = [];
    for (let i = 0; i < feed.length; i++) {
        const item: GestionItem = {
            category,
            brand: "gestion",
            title: feed[i].title ?? "",
            link: feed[i].link ?? "",
            guid: feed[i].guid ?? "",
            dcCreator: feed[i]["dc:creator"] ?? "",
            description : feed[i].description ?? "",
            contentEncoded: stripHtml(feed[i]["content:encoded"]).result ?? "",
            pubDate: feed[i].pubDate ?? "",
            isoDate: new Date(feed[i].isoDate ?? new Date().toISOString()),
        };
        items.push(item);
    }
    return items
}


