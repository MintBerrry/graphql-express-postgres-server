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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log('GraphQL server running on localhost' + PORT)
);
