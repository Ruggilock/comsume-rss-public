import mongoose from "mongoose";
import type { Item } from "../interface/feed";

const conn = mongoose.createConnection(
	"mongodb+srv://news.cnpse87.mongodb.net/news?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=news",
	{
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

	console.log(itemSave);
}

export async function saveItems(items: Item[]) {

	for (const item of items) {
		await saveItem(item);
	}
}
