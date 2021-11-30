import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const GraphqlClient = new ApolloClient({
    uri: 'https://mamarmotte.netlify.app/.netlify/functions/graphql',
    cache: new InMemoryCache()
});

export const SIGNUP_MUTATION = gql`
mutation SignupMutation(
  $email: String!
  $password: String!
  $name: String!
) {
  signup(
    email: $email
    password: $password
    name: $name
  ) {
    token
  }
}
`;

export const LOGIN_MUTATION = gql`
mutation LoginMutation(
  $email: String!
  $password: String!
) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const Queries = {
    PRODUCTS: gql`
        query Product {
            products { 
                id,
                name,
                storageId,
                category
            }
        }
    `,
    STORAGES: gql`
        query Storage {
            storages {
                id,
                name,
                roomId
            }
        }
    `,
    ROOMS: gql`
        query Room {
            rooms {
                id,
                name,
                color
            }
        }
    `,
}

export const Mutations = {
    ADD_PRODUCT: gql`
        mutation AddProduct($name: String!, $storageId: ID!, $id: ID!, $category: String!) {
            addProduct(name: $name, storageId: $storageId, id: $id, category: $category) {
                name,
                storageId,
                category,
                id
            }
        }
    `,
    REMOVE_PRODUCT: gql`
        mutation RemoveProduct($id: ID!) {
            removeProduct(id: $id) {
                id
            }
        }
    `,
    ADD_STORAGE: gql`
        mutation AddStorage($name: String!, $roomId: ID!, $id: ID!) {
            addStorage(name: $name, roomId: $roomId, id: $id) {
                name,
                roomId,
                id
            }
        }
    `,
    REMOVE_STORAGE: gql`
        mutation RemoveStorage($id: ID!) {
            removeStorage(id: $id) {
                id
            }
        }
    `,
    ADD_ROOM: gql`
        mutation AddRoom($name: String!, $color: String!, $id: ID!) {
            addRoom(name: $name, color: $color, id: $id) {
                name,
                color,
                id
            }
        }
    `,
    REMOVE_ROOM: gql`
        mutation RemoveRoom($id: ID!) {
            removeRoom(id: $id) {
                id
            }
        }
    `,
}




// export function getProducts1() {
//     GraphqlClient.query({ query: QUERY_PRODUCTS })
//         .then(result => console.log('[OK] RESULT', result))
//         .catch(error => console.log('[KO] ERROR', error))
// }


// export async function getProducts2() {
//     try {
//         const result = await GraphqlClient.query({})
//     } catch (error) {

//     }
// }
