import type { APIGatewayProxyHandler } from 'aws-lambda';
import { Client } from 'pg';

const DB_PARAMS = {
    host: "cozyread.c1ag20w2kr9w.ap-southeast-2.rds.amazonaws.com",
    port: 5432,
    database: "postgres",
    user: "cozyReadadmin",
    password: "20250323",
    ssl: true
};

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log("event", event);
    const client = new Client(DB_PARAMS);

    try {
        await client.connect();
        const result = await client.query(
            "SELECT\n" +
            "    b.id AS book_id,\n" +
            "    b.title,\n" +
            "    b.summary,\n" +
            "    a.name AS author,\n" +
            "    f.url AS image_url\n" +
            "  FROM books b\n" +
            "  LEFT JOIN book_authors ba ON b.id = ba.book_id\n" +
            "  LEFT JOIN authors a ON ba.author_id = a.id\n" +
            "  LEFT JOIN formats f ON b.id = f.book_id\n" +
            "  WHERE f.format_type LIKE 'image/%'");

        await client.end();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
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