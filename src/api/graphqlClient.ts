import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const GraphqlClient = new ApolloClient({
    uri: 'https://mamarmotte.netlify.app/.netlify/functions/graphql',
    cache: new InMemoryCache()
});



export const Queries = {
    PRODUCTS: gql`
        query Product {
            products { id, name, storageId, category }
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
