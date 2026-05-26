
require("dotenv").config();
const {Client} = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 username VARCHAR(255),
 text TEXT,
 added TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO messages (username, text)
 VALUES 
 ('Elon','Hii Everyone its Marsy Today'),
 ('Jeff','I felt its humid like amazon'),
 ('Mark','Naah You guys are wrong its clear today');
`;

async function main() {
    console.log("seeding...");
    const client = new Client ({
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        database : process.env.DB_DATABASE
    });

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("Seeding Done");
}

main();