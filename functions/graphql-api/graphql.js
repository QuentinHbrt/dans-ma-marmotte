const { ApolloServer, gql, UserInputError } = require("apollo-server-lambda");
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
    addRoom(name: String!, color: String!, id: ID!): Room
    removeRoom(id: ID!): Room
    addStorage(name: String!, id: ID!, roomId: ID!): Storage
    removeStorage(id: ID!): Storage
    addProduct(
      name: String!
      storageId: ID!
      id: ID!
      category: String!
    ): Product
    removeProduct(id: ID!): Product
  }
`;

async function queryRooms() {
  const results = await client.query(q.Paginate(q.Match(q.Index("rooms"))));
  return results.data.map(([ref, name, color]) => ({
    id: ref.id,
    name,
    color,
  }));
}

async function queryStorages() {
  const results = await client.query(q.Paginate(q.Match(q.Index("storages"))));
  return results.data.map(([ref, name, roomId]) => ({
    id: ref.id,
    name,
    roomId,
  }));
}

async function queryProducts() {
  const results = await client.query(q.Paginate(q.Match(q.Index("products"))));
  return results.data.map(([ref, name, storageId, category]) => ({
    id: ref.id,
    name,
    storageId,
    category,
  }));
}

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    rooms: async () => {
      try {
        const rooms = await queryRooms();
        return rooms;
      } catch (error) {
        console.log("error query rooms", error);
        return Promise.reject(error);
      }
    },
    storages: async () => {
      try {
        const storages = await queryStorages();
        return storages;
      } catch (error) {
        console.log("erreur storages", error);
        return Promise.reject(error);
      }
    },
    products: async () => {
      try {
        const products = await queryProducts();
        return products;
      } catch (error) {
        console.log("erreur products", error);
        return Promise.reject(error);
      }
    },
  },
  Mutation: {
    addRoom: async (_, { name, color }) => {
      try {
        const results = await client.query(
          q.Create(q.Collection("Room"), {
            data: {
              name,
              color,
            },
          })
        );
        return {
          ...results.data,
          id: results.ref.id,
        };
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },

    removeRoom: async (_, { id }) => {
      try {
        const storages = await queryStorages();
        const rooms = await queryRooms();
        const roomToRemove = rooms.find((room) => room.id === id);
        if (!roomToRemove) {
          throw new UserInputError(`La pi??ce n'existe pas`);
        }
        let count = 0;
        storages.forEach((storage) => {
          if (storage.roomId === id) {
            count = count + 1;
          }
        });
        if (count > 0) {
          throw new UserInputError(
            `La pi??ce ${roomToRemove.name} est utilis??e par ${count} rangement(s)`
          );
        }
        // Au lieu de remplacer le tableau, supprimer la room dans la collection "Room" de faunadb
        client.query(q.Delete(q.Ref(q.Collection("Room"), id)));
        return {
          ...roomToRemove,
        };
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },

    addStorage: async (_, { name, roomId }) => {
      try {
        const rooms = await queryRooms();
        const roomToAssociate = rooms.find((room) => room.id === roomId);
        if (!roomToAssociate) {
          throw new UserInputError(
            `la pi??ce demand??e pour ce rangement n'existe pas`
          );
        }
        const results = await client.query(
          q.Create(q.Collection("Storage"), {
            data: {
              name,
              roomId,
            },
          })
        );
        console.log("results storage", results);
        return {
          ...results.data,
          id: results.ref.id,
        };
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    removeStorage: async (_, { id }) => {
      const rooms = await queryRooms();
      const storages = await queryStorages();
      const storageToRemove = storages.find((storage) => storage.id === id);
      if (!storageToRemove) {
        throw new UserInputError(`Le rangement n'existe pas`);
      }
      let count = 0;
      rooms.forEach((room) => {
        if (room.storageId === id) {
          count = count + 1;
        }
      });
      if (count > 0) {
        throw new UserInputError(
          `Le rangement ${storageToRemove.name} est utilis?? par ${count} pi??ce(s)`
        );
      }
      client.query(q.Delete(q.Ref(q.Collection("Storage"), id)));
      return {
        ...storageToRemove,
      };
    },
    addProduct: async (_, { name, category, storageId }) => {
      try {
        const storages = await queryStorages();
        const storageToAssociate = storages.find(
          (storage) => storage.id === storageId
        );
        if (!storageToAssociate) {
          throw new UserInputError(
            `le rangement demand?? pour ce produit n'existe pas`
          );
        }
        const results = await client.query(
          q.Create(q.Collection("Product"), {
            data: {
              name,
              category,
              storageId,
            },
          })
        );
        return {
          ...results.data,
          id: results.ref.id,
        };
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    removeProduct: async (_, { id }) => {
      try {
        const products = await queryProducts();
        const productToRemove = products.find((product) => product.id === id);
        if (!productToRemove) {
          throw new UserInputError(`Le produit n'existe pas`);
        }
        client.query(q.Delete(q.Ref(q.Collection("Product"), id)));
        return {
          ...productToRemove,
        };
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    } else {
      return {};
    }
  },

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
    origin: "*",
    credentials: false,
  },
});
