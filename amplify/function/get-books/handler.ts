import type { Handler } from 'aws-lambda';
import { Client } from 'pg';

const DB_PARAMS = {
    host: "cozyread.c1ag20w2kr9w.ap-southeast-2.rds.amazonaws.com",
    port: 5432,
    database: "postgres",
    user: "cozyReadadmin",
    password: "20250323",
    ssl: true
};

export const handler: Handler = async (event) => {
    const client = new Client(DB_PARAMS);

    try {
        await client.connect();
        const result = await client.query("SELECT title, summary FROM books;");
        await client.end();

        return {
            statusCode: 200,
            body: JSON.stringify(result.rows),
        };
    } catch (error) {
        console.error("连接失败：", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: String(error) }),
        };
    }
};