#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstName VARCHAR (255),
        lastName VARCHAR (255),
        username VARCHAR (255),
        password VARCHAR (255),
        isMember BOOLEAN,
        isAdmin BOOLEAN
    );
    
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        userID INTEGER,
        title VARCHAR (255),
        message VARCHAR (255),
        createTime TIMESTAMP
    );`
;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://nosis:rAgn4r0k@localhost:5432/memonly",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();