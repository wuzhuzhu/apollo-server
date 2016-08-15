import { createApolloServer } from 'meteor/apollo';
import { typeDefs, resolvers } from './schema'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default function () {
  createApolloServer({
    graphiql: true,
    pretty: true,
    schema,
    resolvers,
  })
}
