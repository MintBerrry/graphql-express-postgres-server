"use strict";
const graphql = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");
const cors = require( `cors` );

const schema = new GraphQLSchema({
  query,
  mutation
});

var app = express();
app.use( cors() );
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.get('/test', (req, res) => res.send('Hello World!'))

app.use(
  '/',
  expressGraphQl({
    schema: schema,
    introspection: true,
    playground: true,
    graphiql: true
  })
);
const PORT = process.env.PORT || 3002;

app.listen(PORT, () =>
  console.log('GraphQL server running on localhost' + PORT)
);
