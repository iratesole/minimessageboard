
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
        connectionString : process.env.DATABASE_URL
    });

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("Seeding Done");
}

main();