import { Elysia } from "elysia";
import { Patterns, cron } from "@elysiajs/cron";
import { parse } from "./rss/parse";
import { saveItems } from "./db/store";

const urlEconomia = {
	economia: [
		{
			url: "https://elcomercio.pe/arc/outboundfeeds/rss/category/economia/?outputType=xml",
			brand: "elcomercio",
		},
		{
			url: "https://gestion.pe/arcio/rss/category/economia/empresas/",
			brand: "gestion",
		},
		{
			url: "https://gestion.pe/arcio/rss/category/economia/mercados/",
			brand: "gestion",
		},
		{
			url: "https://gestion.pe/arcio/rss/category/economia/management-empleo/",
			brand: "gestion",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/economia/negocios/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/economia/ejecutivos/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/economia/mercados/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/economia/opinion/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/economia/personal/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/economia/mundo/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/economia/peru/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/economia/dia-1/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/economia/lec/",
			brand: "elcomercio",
		},
	],
};
const urlPolitica = {
	politica: [
		{
			url: "https://gestion.pe/arcio/rss/category/videos/politica/",
			brand: "gestion",
		},
		{
			url: "https://gestion.pe/arcio/rss/category/peru/politica/",
			brand: "gestion",
		},
		{
			url: "https://elcomercio.pe/arc/outboundfeeds/rss/category/politica/?outputType=xml",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/politica/actualidad/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/politica/elecciones/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/politica/justicia/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/politica/partidos/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/politica/congreso/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/politica/gobierno/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/politica/internacional/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/politica/opinion/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/politica/polemica",
			brand: "elcomercio",
		},
	],
};

// 	mundo : [
// 		{
// 			url: "https://gestion.pe/arcio/rss/category/mundo/estados-unidos/",
// 			brand: "gestion"
// 		},
// 		{
// 			url: "https://gestion.pe/arcio/rss/category/mundo/espana/",
// 			brand: "gestion"
// 		},
// 		{
// 			url: "https://gestion.pe/arcio/rss/category/mundo/mexico/",
// 			brand: "gestion"
// 		},
// 		{
// 			url: "https://gestion.pe/arcio/rss/category/mundo/internacional/",
// 			brand: "gestion"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arc/outboundfeeds/rss/category/mundo/?outputType=xml",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/asia/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/desastres/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/eeuu/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/escandalos/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/europa/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/latinoamerica/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/mexico/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/norteamerica/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/onu/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/perfil/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/tragedia/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/africa/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/armamentismo/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/diplomacia/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/elecciones/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/espana/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/justicia/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/medio-ambiente/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/narcotrafico/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/narcotrafico/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/oea/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/oriente-medio/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/terrorismo/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/venezuela/",
// 			brand: "elcomercio"
// 		},
// 		{
// 			url: "https://elcomercio.pe/arcio/rss/category/mundo/centroamerica/",
// 			brand: "elcomercio"
// 		}
// 	],
// 	bienestar : [
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/bienestar/alimentacion/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/artlima/espiritualidad/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/artlima/salud-fisica/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/artlima/crecimiento-personal/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/artlima/mente-sana/",
// 			brand : "elcomercio"
// 		}
// 	],
// 	tendencias : [
// 		{
// 			url:"https://gestion.pe/arcio/rss/category/tendencias/estilos/",
// 			brand : "gestion"
// 		},
// 		{
// 			url:"https://gestion.pe/arcio/rss/category/tendencias/lujos/",
// 			brand : "gestion"
// 		},
// 		{
// 			url:"https://gestion.pe/arcio/rss/category/tendencias/moda/",
// 			brand : "gestion"
// 		},
// 		{
// 			url:"https://gestion.pe/arcio/rss/category/tendencias/viajes/",
// 			brand : "gestion"
// 		}
// 	],
// 	tecnologia : [
// 		{
// 			url:"https://gestion.pe/arc/outboundfeeds/rss/category/tecnologia/?outputType=xml",
// 			brand : "gestion"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/tecnologia/gadgets/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/tecnologia/redes-sociales/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/tecnologia/robotica/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/tecnologia/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/tecnologia/videojuegos/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/tecnologia/streamers/",
// 			brand : "elcomercio"
// 		}
// 	],
// 	deporte : [
// 		{
// 			url:"https://gestion.pe/arcio/rss/category/mix/sports/",
// 			brand : "gestion"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/trivias/deporte-total/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/videos/deportes/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arc/outboundfeeds/rss/category/deporte-total/?outputType=xml",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/deporte-total/futbol-peruano/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/deporte-total/futbol-mundial/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/deporte-total/tenis/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/deporte-total/voley/",
// 			brand : "elcomercio"
// 		}
// 	],
// 	gastronomia : [
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/gastronomia/chefs/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/gastronomia/recetas/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/gastronomia/nutricion/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/gastronomia/bares-y-copas/",
// 			brand : "elcomercio"
// 		},
// 		{
// 			url:"https://elcomercio.pe/arcio/rss/category/gastronomia/internacional/",
// 			brand : "elcomercio"
// 		}
// 	]
// };

async function crons(url: { [key: string]: { url: string; brand: string }[] }) {
	console.log("Running crons at", new Date().toISOString());
	let items = [];
	for (const key in url) {
		for (const item of url[key as keyof typeof url]) {
			items = await parse(item.url, key, item.brand);
			await saveItems(items);
		}
	}
}

async function cronMapper(name:string, url: { [key: string]: { url: string; brand: string }[] }) {
	return cron({
		name,
		pattern: Patterns.everyMinutes(30),
		async run() {
			await crons(url);
		},
	});
}
const app = new Elysia()
	.use( cronMapper('economia', urlEconomia))
	.use( cronMapper('politica', urlPolitica))
	.use( cronMapper('economia', urlEconomia))
	.use( cronMapper('economia', urlEconomia))
	.use( cronMapper('economia', urlEconomia))
	.use( cronMapper('economia', urlEconomia))

	.listen(3000);

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );
