import mongoose from "mongoose";
import type { Item } from "../interface/feed";
import { t } from "elysia";

const conn = mongoose.createConnection(
	Bun.env.MONGO_URL ?? "mongodb://localhost:27017/rss",
	{
		tls:true,
		serverApi: { version: "1", strict: true, deprecationErrors: true },
		tlsCertificateKeyFile: "rootCA.pem",
	},
);

const ItemSchema = new mongoose.Schema({
	category: String,
	brand: String,
	title: String,
	link: String,
	guid: String,
	dcCreator: String,
	pubDate: String,
	description: String,
	contentEncoded: String,
	isoDate: Date,
});
const ItemDb = conn.model("Item", ItemSchema);

export async function saveItem(item: Item) {
	const instance = await ItemDb.findOne({ link: item.link });
	if (instance) {
		return;
	}
	const newItem = new ItemDb(item);
	const itemSave = await newItem.save();

	console.log(`Item saved: ${itemSave.title} date: ${itemSave.isoDate}`);
}

export async function saveItems(items: Item[]) {
	for (const item of items) {
		await saveItem(item);
	}
}
