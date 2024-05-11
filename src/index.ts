import { Elysia } from "elysia";
import { cron } from "@elysiajs/cron";
import { parseComercio } from "./rss/comercio.parse";
import { parseGestion } from "./rss/gestion.parse";

const url = {
	economia: [
		{
			url: "https://elcomercio.pe/arc/outboundfeeds/rss/category/economia/?outputType=xml",
			brand: "elcomercio",
		},
        {
			url: "https://gestion.pe/arcio/rss/category/economia/empresas/",
			brand: "gestion",
		}
	],
    politica : [
        {
            url:"https://gestion.pe/arcio/rss/category/videos/politica/",
            brand : "gestion"
        }
    ]
};

async function crons() {
    for (const key in url) {
        for (const item of url[key as keyof typeof url]) {
            if (item.brand === "elcomercio") {
                const feed = JSON.stringify(await parseComercio(item.url, key));
                console.log(feed);
            }
            else if (item.brand === "gestion") {
                const feed = JSON.stringify(await parseGestion(item.url,key));
                console.log(feed);
            }
        }
    }
}

const app = new Elysia()
    .use(
        cron({
            name: "heartbeat",
            pattern: "* 10 * * * *",
            async run() {
                await crons();
            },
        }),
    )
    .listen(3000);

// const app = new Elysia()
// 	.use(
// 		cron({
// 			name: "heartbeat",
// 			pattern: "*/10 * * * * *",
// 			async run() {
// 				await crons();
// 			},
// 		}),
// 	)
// 	.listen(3000);

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );
