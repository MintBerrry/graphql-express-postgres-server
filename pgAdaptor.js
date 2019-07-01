require("dotenv").config();
const pgPromise = require("pg-promise");

const pgp = pgPromise({});
let config;
console.log(process.env.NODE_ENV, "Env Var")
if (process.env.NODE_ENV !== "production") {
  config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  };
} else {
  const url = require("url");
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth ? params.auth.split(":") : [null, null];

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split("/")[1],
    ssl: process.env.NODE_ENV !== "development"
  };
}
const db = pgp(config);

exports.db = db;
