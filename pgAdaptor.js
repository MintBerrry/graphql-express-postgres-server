require("dotenv").config();
const pgPromise = require("pg-promise");

const pgp = pgPromise({});
let config;
if (process.env.NODE_ENV !== "production") {
  config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  };
} else {
  config = process.env.DATABASE_URL;
}
const db = pgp(config);

exports.db = db;
