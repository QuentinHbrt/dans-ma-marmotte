const { ApolloServer, gql, UserInputError } = require('apollo-server-lambda');
const faunadb = require("faunadb");
const q = faunadb.query;

let client = new faunadb.Client({ secret: process.env.FAUNA });

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
    addStorage(name: String!, id: ID!, roomId: ID!): Storage
    removeStorage(id: ID!): Storage
    addProduct(name: String!, storageId: ID!, id: ID!, category: String!): Product
    removeProduct(id: ID!): Product
  }
`;


let rooms = []
let storages = []
let products = []

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    rooms: async () => {
      try {
        const results = await client.query(
          q.Paginate(q.Match(q.Index("all_rooms")))
        );
        console.log('RESULTS', results)
        return results.data.map(([ref, name, color]) => ({
          id: ref.id,
          name,
          color
        }));
      } catch (error) {
        console.log('errrrrreur', error)
      }

    },
    storages: async () => {
      try {
        const results = await client.query(
          q.Paginate(q.Match(q.Index("all_storages")))
        );
        console.log('RESULTS', results)
        return results.data.map(([ref, name, roomId]) => ({
          id: ref.id,
          name,
          roomId: ref.roomId
        }));
      } catch (error) {
        console.log('errrrrreur', error)
      }
    },
    products: async () => products,
  },
  Mutation: {
    addRoom: async (_, { name, color }) => {
      const results = await client.query(
        q.Create(q.Collection("rooms"), {
          data: {
            name,
            color
          }
        })
      );
      return {
        ...results.data,
        id: results.ref.id
      }
    },

    removeRoom: (_, { id }) => {
      const roomToRemove = rooms.find(room => room.id === id)
      if (!roomToRemove) {
        throw new UserInputError(`La piéce n'existe pas`)
      }
      let count = 0
      storages.forEach((storage) => {
        if (storage.roomId === id) {
          count = count + 1
        }
      })
      if (count > 0) {
        throw new UserInputError(`La pièce ${roomToRemove.name} est utilisée par ${count} rangement(s)`)
      }

      rooms = rooms.filter(room => room.id !== id)
      return roomToRemove
    },
    addStorage: (_, { name, id, roomId }) => {
      const roomToAssociate = rooms.find(room => room.id === roomId)
      if (!roomToAssociate) {
        throw new UserInputError(`la pièce demandée pour ce rangement n'existe pas`)
      }
      const newStorage = {
        name,
        id: `storage-${id}`,
        roomId
      }
      storages = [...storages, newStorage]
      return newStorage
    },
    removeStorage: (_, { id }) => {
      const storageToRemove = storages.find(storage => storage.id === id)
      if (!storageToRemove) {
        throw new UserInputError(`Le rangement n'existe pas`)
      }
      let count = 0
      rooms.forEach((room) => {
        if (room.storageId === id) {
          count = count + 1
        }
      })
      if (count > 0) {
        throw new UserInputError(`Le rangement ${storageToRemove.name} est utilisé par ${count} pièce(s)`)
      }
      storages = storages.filter(storage => storage.id !== id)
      return storageToRemove
    },
    addProduct: (_, { name, id, storageId, category }) => {
      const storageToAssociate = storages.find(storage => storage.id === storageId)
      if (!storageToAssociate) {
        throw new UserInputError(`le rangement demandé pour ce produit n'existe pas`)
      }
      const newProduct = {
        name,
        id: `product-${id}`,
        storageId,
        category
      }
      products = [...products, newProduct]
      return newProduct
    },
    removeProduct: (_, { id }) => {
      const productToRemove = products.find(product => product.id === id)
      if (!productToRemove) {
        throw new UserInputError(`Le produit n'existe pas`)
      }
      products = products.filter(product => product.id !== id)
      return productToRemove
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

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: false
  }
});