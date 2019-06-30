const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const {UserType, ProjectType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        creatorid: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO project(creatorid, created, title, description) VALUES ($1, $2, $3, $4) RETURNING title`;
        // TODO - figure out how to return multiple after mutation, id etc
        const values = [
          args.creatorid,
          new Date(),
          args.title,
          args.description
        ];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        
        const query = `INSERT INTO users(username, email,joined, last_logged_in) VALUES ($1, $2,$3,$4) RETURNING username`;
        // TODO - figure out how to return multiple after mutation, id etc
        const values = [
          args.username,
          args.email,
          new Date(),
          new Date(),
        ];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.mutation = RootMutation;
