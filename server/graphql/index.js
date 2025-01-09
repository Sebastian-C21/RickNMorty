const { ApolloServer } = require("apollo-server");
const characterSchema = require("./schemas/characterSchema");
const characterResolvers = require("./resolvers/characterResolvers");

const server = new ApolloServer({
  typeDefs: [characterSchema],
  resolvers: [characterResolvers],
});

module.exports = server;