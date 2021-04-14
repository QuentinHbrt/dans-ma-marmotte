import { useMutation, useQuery } from '@apollo/client';
import { Box, Text } from '@theme-ui/components';
import React, { FC } from 'react';
import { Button } from 'reactstrap';
import { Mutations, Queries } from '../api/graphqlClient';
import { Product, Room, Storage } from '../api/types';
import { ProductForm } from '../components/ProductForm';
import { ProductsList } from '../components/ProductsList';
import { Link } from 'react-router-dom';

export const ProductsPage: FC = () => {

    const productsQuery = useQuery<{ products: Product[] }>(Queries.PRODUCTS)
    const storagesQuery = useQuery<{ storages: Storage[] }>(Queries.STORAGES)
    const roomsQuery = useQuery<{ rooms: Room[] }>(Queries.ROOMS)

    console.log('GQL', productsQuery.loading, productsQuery.data, productsQuery.called, productsQuery.error)

    const [addProductMut] = useMutation<{ addProduct: Product }, Product>(Mutations.ADD_PRODUCT)
    const [removeProductMut] = useMutation<{ removeProduct: Product }, { id: string }>(Mutations.REMOVE_PRODUCT)


    function addProductGQL(newProduct: Product) {
        console.log('CALL ADD PRODUCT MUTATION', newProduct)

        const mesVariables = {
            id: newProduct.id,
            name: newProduct.name,
            category: newProduct.category,
            storageId: newProduct.storageId
        }
        const mutOptions = {
            variables: mesVariables,
        }
        addProductMut(mutOptions).then(() => productsQuery.refetch()).catch((error) => alert(error))
    }
    function removeProductGQL(productToRemove: Product) {
        console.log('CALL REMOVE PRODUCT MUTATION', productToRemove)

        const mesVariables = {
            id: productToRemove.id,
        }
        const mutOptions = {
            variables: mesVariables,
        }
        removeProductMut(mutOptions).then(() => productsQuery.refetch()).catch((error) => alert(error))
    }

    return (
        <body>
            <section className="masthead-products d-flex">
                <div className="container text-center my-auto">
                    <h1 className="mb-1">{"MES PRODUITS"}</h1>
                </div>
            </section>
            <section>
                <Box>
                    {productsQuery.loading && <Text>{'CHARGEMENT...'}</Text>}
                    {productsQuery.data && <ProductsList products={productsQuery.data.products} onDeleteProduct={removeProductGQL} />}
                    <Link to="/ProductForm"><Button>{"Add Product"}</Button></Link>
                    {storagesQuery.data && roomsQuery.data && <ProductForm onSubmitProduct={addProductGQL} storagesProperty={storagesQuery.data.storages} roomsProperty={roomsQuery.data.rooms} />}
                </Box>
            </section>
        </body>
    )
}