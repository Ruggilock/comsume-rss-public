import mongoose from "mongoose";
import type { Item } from "../interface/feed";
import { t } from "elysia";

const conn = mongoose.createConnection(
	"mongodb+srv://news.cnpse87.mongodb.net/news?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=news",
	{
		tls:true,
		serverApi: { version: "1", strict: true, deprecationErrors: true },
		tlsCertificateKeyFile: "rootCA.pem",
	},
);

export async function run() {
	try {
		console.log()
		const conn = mongoose.createConnection(
			Bun.env.MONGO_URL ?? "mongodb://localhost:27017/rss",
			{
				serverApi: { version: "1", strict: true, deprecationErrors: true },
				tlsCertificateKeyFile: "rootCA.pem",
			},
		);
		conn.db.admin().command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!",
		);
	} finally {
		// Ensures that the client will close when you finish/error
		await mongoose.disconnect();
	}
}

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
