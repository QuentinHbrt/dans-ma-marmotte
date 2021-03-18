const { ApolloServer, gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Room {
    id: ID!
    name: String!
    color: String!
  }
  
  type Storage {
    id: ID!
    name: String!
    roomId: ID!
  }

  type Product {
    id: ID!
    name: String!
    storageId: ID!
    category: String!
  }

  type Query {
    rooms: [Room]
    storages: [Storage]
    products: [Product]
  }

  type Mutation {
    addRoom(name: String!, color: String!, id: ID! ): Room
    removeRoom(id: ID!): Room
  }
`;


let rooms = []
// let storages = []
// let products = []

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    rooms: () => rooms,
    storages: () => ([{ id: 'storage-1', name: 'boite 1', roomId: 'room-1' }]),
    products: () => ([{ id: 'product-1', name: 'draps', category: 'literie', storageId: 'storage-1' }]),
  },
  Mutation: {
    addRoom: (_, { name, id, color }) => {
      const newRoom = { name, color, id: `room-${id}` }
      rooms = [...rooms, newRoom]
      return newRoom
    },
    removeRoom: (_, { id }) => {
      const roomToRemove = rooms.find(room => room.id === id)
      rooms = rooms.filter(room => room.id !== id)
      return roomToRemove
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();