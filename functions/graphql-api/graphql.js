const { ApolloServer, gql, UserInputError } = require('apollo-server-lambda');
const faunadb = require("faunadb");
const q = faunadb.query;

let client = new faunadb.Client({ secret: process.env.FAUNA });

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
type Room {
  name: String!
  _id: ID!
  color: String!
  id: ID!
  _ts: Long!
}

input RoomInput {
  id: ID!
  name: String!
  color: String!
}

type RoomPage {
  data: [Room]!
  after: String
  before: String
}
  
  type Storage {
  roomId: ID!
  name: String!
  _id: ID!
  id: ID!
  _ts: Long!
}

input StorageInput {
  id: ID!
  name: String!
  roomId: ID!
}

type StoragePage {
  data: [Storage]!
  after: String
  before: String
}

  type Product {
  name: String!
  storageId: ID!
  _id: ID!
  id: ID!
  category: String!
  _ts: Long!
}

input ProductInput {
  id: ID!
  name: String!
  storageId: ID!
  category: String!
}

type ProductPage {
  data: [Product]!
  after: String
  before: String
}

type Query {
  findProductByID(id: ID!): Product
  findRoomByID(id: ID!): Room
  products(
    _size: Int
    _cursor: String
  ): ProductPage!
  rooms(
    _size: Int
    _cursor: String
  ): RoomPage!
  findStorageByID(id: ID!): Storage
  storages(
    _size: Int
    _cursor: String
  ): StoragePage!
}

 type Mutation {
    addRoom(data: RoomInput!): Room
    removeRoom(id: ID!): Room
    addStorage(data: StorageInput!): Storage!
    removeStorage(id: ID!): Storage
    addProduct(data: ProductInput!): Product
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
        console.log('1.1')
        const results = await client.query(
          q.Ref(q.Collection("rooms"))
        );
        console.log('2.1');
        return results.data.map(([name, color]) => ({
          name,
          color
        }));
      } catch (error) {
        console.log('ERROR', error)
        return Promise.reject(error)
      }
    },
    storages: async () => {
      try {
        const results = await client.query(
          q.Paginate(q.Match(q.Index("storages")))
        );
        console.log('RESULTS storages', results)
        return results.data.map(([data]) => ({
          id: data.ref.id,
          name: data.name
        }));
      } catch (error) {
        console.log('errrrrreur storages', error)
        return Promise.reject(error)

      }
    },
    products: async () => {
      try {
        const results = await client.query(
          q.Paginate(q.Match(q.Index("products")))
        );
        console.log('RESULTS Products', results)
        return results.data.map(([ref, name, storageId, category]) => ({
          id: ref.id,
          name,
          storageId,
          category
        }));
      } catch (error) {
        console.log('errrrrreur storages', error)
        return Promise.reject(error)
      }
    }
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