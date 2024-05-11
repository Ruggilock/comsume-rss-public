import { Database } from "bun:sqlite";

async function createDatabase() {
	const db = new Database("db.sqlite");
	const query = db.query(
		"CREATE TABLE date ( brand TEXT,last_builddate TEXT);",
	);
	query.run();

	const query2 = db.query(
		"INSERT INTO date (brand, last_builddate) VALUES ('elcomercio', '2024-05-08T05:00:00.000Z');",
	);
	query2.run();

	const query3 = db.query(
		"INSERT INTO date (brand, last_builddate) VALUES ('gestion', '2024-05-08T05:00:00.000Z');",
	);
	query3.run();
}

export async function getLastBuildDate(brand: string) {
    const db = new Database("db.sqlite");
    const query = db.query(
        "SELECT last_builddate FROM date WHERE brand = $brand;",);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const result: any = query.get({ $brand: brand });
    return result.last_builddate;
}

export async function updateLastBuildDate(brand: string, lastBuildDate: string) {
    const db = new Database("db.sqlite");
    const query = db.query(
        "UPDATE date SET last_builddate = $lastBuildDate WHERE brand = $brand;",
    );
    query.run({ $brand: brand, $lastBuildDate: lastBuildDate });
}