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
		{
			url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/economia/portada",
			brand: "elpais",
		},
		{
			url: "https://www.abc.es/rss/2.0/economia/",
			brand: "abc",
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
const urlMundo = {
	mundo: [
		{
			url: "https://gestion.pe/arcio/rss/category/mundo/estados-unidos/",
			brand: "gestion",
		},
		{
			url: "https://gestion.pe/arcio/rss/category/mundo/espana/",
			brand: "gestion",
		},
		{
			url: "https://gestion.pe/arcio/rss/category/mundo/mexico/",
			brand: "gestion",
		},
		{
			url: "https://gestion.pe/arcio/rss/category/mundo/internacional/",
			brand: "gestion",
		},
		{
			url: "https://elcomercio.pe/arc/outboundfeeds/rss/category/mundo/?outputType=xml",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/asia/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/desastres/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/eeuu/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/escandalos/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/europa/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/latinoamerica/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/mexico/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/norteamerica/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/onu/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/perfil/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/tragedia/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/africa/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/armamentismo/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/diplomacia/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/elecciones/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/espana/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/justicia/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/medio-ambiente/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/narcotrafico/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/narcotrafico/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/oea/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/oriente-medio/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/terrorismo/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/venezuela/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/mundo/centroamerica/",
			brand: "elcomercio",
		},
		{
			url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/internacional/portada",
			brand: "elpais",
		},
		{
			url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/argentina/portada",
			brand: "elpais",
		},
		{
			url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/mexico/portada/",
			brand: "elpais",
		},
		{
			url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/america-colombia/portada",
			brand: "elpais",
		},
		{
			url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/chile/portada",
			brand: "elpais",
		},
		{
			url: "https://www.abc.es/rss/2.0/espana/madrid/",
			brand: "abc",
		},
		{
			url: "https://www.abc.es/rss/2.0/espana/",
			brand: "abc",
		},
		{
			url: "https://www.abc.es/rss/2.0/internacional/",
			brand: "abc",
		},
	],
};
const urlBienestar = {
	bienestar: [
		{
			url: "https://elcomercio.pe/arcio/rss/category/bienestar/alimentacion/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/artlima/espiritualidad/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/artlima/salud-fisica/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/artlima/crecimiento-personal/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/artlima/mente-sana/",
			brand: "elcomercio",
		},
		{
			url: "https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/mamas-papas",
			brand: "elpais",
		},
		{
			url: "https://www.abc.es/rss/2.0/bienestar/alimentacion/",
			brand: "abc",
		},
		{
			url: "https://www.abc.es/rss/2.0/bienestar/fitness/",
			brand: "abc",
		},
		{
			url: "https://www.abc.es/rss/2.0/bienestar/psicologia-sexo/",
			brand: "abc",
		},
	],
};
const urlTendencias = {
	tendencias: [
		{
			url: "https://gestion.pe/arcio/rss/category/tendencias/estilos/",
			brand: "gestion",
		},
		{
			url: "https://gestion.pe/arcio/rss/category/tendencias/lujos/",
			brand: "gestion",
		},
		{
			url: "https://gestion.pe/arcio/rss/category/tendencias/moda/",
			brand: "gestion",
		},
		{
			url: "https://gestion.pe/arcio/rss/category/tendencias/viajes/",
			brand: "gestion",
		},
	],
};
const urlTecnologia = {
	tecnologia: [
		{
			url: "https://gestion.pe/arc/outboundfeeds/rss/category/tecnologia/?outputType=xml",
			brand: "gestion",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/tecnologia/gadgets/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/tecnologia/redes-sociales/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/tecnologia/robotica/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/tecnologia/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/tecnologia/videojuegos/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/tecnologia/streamers/",
			brand: "elcomercio",
		},
		{
			url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/tecnologia/portada",
			brand: "elpais",
		},
		{
			url: "https://www.abc.es/rss/2.0/tecnologia/",
			brand: "abc",
		},
	],
};
const urlDeporte = {
	deporte: [
		{
			url: "https://gestion.pe/arcio/rss/category/mix/sports/",
			brand: "gestion",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/trivias/deporte-total/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/videos/deportes/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arc/outboundfeeds/rss/category/deporte-total/?outputType=xml",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/deporte-total/futbol-peruano/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/deporte-total/futbol-mundial/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/deporte-total/tenis/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/deporte-total/voley/",
			brand: "elcomercio",
		},
		{
			url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/deportes/portada",
			brand: "elpais",
		},
		{
			url: "https://www.abc.es/rss/2.0/deportes/real-madrid/",
			brand: "abc",
		},
		{
			url: "https://www.abc.es/rss/2.0/deportes/tenis/",
			brand: "abc",
		},
		{
			url: "https://www.abc.es/rss/2.0/deportes/atletico-madrid/",
			brand: "abc",
		},
		{
			url: "https://www.abc.es/rss/2.0/deportes/futbol/",
			brand: "abc",
		},
		{
			url: "https://www.abc.es/rss/2.0/deportes/ciclismo/",
			brand: "abc",
		},
		{
			url: "https://www.abc.es/rss/2.0/deportes/vela/",
			brand: "abc",
		},
	],
};
const urlGastronomia = {
	gastronomia: [
		{
			url: "https://elcomercio.pe/arcio/rss/category/gastronomia/chefs/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/gastronomia/recetas/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/gastronomia/nutricion/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/gastronomia/bares-y-copas/",
			brand: "elcomercio",
		},
		{
			url: "https://elcomercio.pe/arcio/rss/category/gastronomia/internacional/",
			brand: "elcomercio",
		},
		{
			url: "https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/gastronomia",
			brand: "elpais",
		},
	],
};

const urlCiencia = {
	ciencia: [
		{
			url: "https://www.bbc.com/mundo/temas/ciencia/index.xml",
			brand: "bbc",
		},
		{
			url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/ciencia/portada",
			brand: "elpais",
		},
		{
			url: "https://www.abc.es/rss/2.0/ciencia/",
			brand: "abc",
		},
	],
};

async function crons(url: { [key: string]: { url: string; brand: string }[] }) {
	console.log("Running crons at", new Date().toISOString());
	let items = [];
	for (const key in url) {
		for (const item of url[key as keyof typeof url]) {
			console.log(`Parsing ${key} ${item.brand}...`);
			items = await parse(item.url, key, item.brand);
			await saveItems(items);
		}
	}
}

async function cronMapper(
	name: string,
	url: { [key: string]: { url: string; brand: string }[] },
) {
	return cron({
		name,
		pattern: Patterns.everyMinutes(30),
		async run() {
			await crons(url);
		},
	});
}

const app = new Elysia()
	.use(cronMapper("economia", urlEconomia))
	.use(cronMapper("politica", urlPolitica))
	.use(cronMapper("mundo", urlMundo))
	.use(cronMapper("bienestar", urlBienestar))
	.use(cronMapper("tendencias", urlTendencias))
	.use(cronMapper("tecnologia", urlTecnologia))
	.use(cronMapper("deporte", urlDeporte))
	.use(cronMapper("gastronomia", urlGastronomia))
	.use(cronMapper("ciencia", urlCiencia))
	.get("/getEconomia", async () => {
		await crons(urlEconomia);
	})
	.get("/getPolitica", async () => {
		await crons(urlPolitica);
	})
	.get("/getMundo", async () => {
		await crons(urlMundo);
	})
	.get("/getBienestar", async () => {
		await crons(urlBienestar);
	})
	.get("/getTendencias", async () => {
		await crons(urlTendencias);
	})
	.get("/getTecnologia", async () => {
		await crons(urlTecnologia);
	})
	.get("/getDeporte", async () => {
		await crons(urlDeporte);
	})
	.get("/getGastronomia", async () => {
		await crons(urlGastronomia);
	})
	.get("/getCiencia", async () => {
		await crons(urlCiencia);
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
