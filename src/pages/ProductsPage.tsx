import { useMutation, useQuery } from '@apollo/client';
import { Card, Text } from '@theme-ui/components';
import React, { FC } from 'react';
import { Button } from 'reactstrap';
import { Mutations, Queries } from '../api/graphqlClient';
import { Product, Room, Storage } from '../api/types';
import { ProductsList } from '../components/ProductsList';
import { Link } from 'react-router-dom';

export const ProductsPage: FC = () => {

    const productsQuery = useQuery<{ products: Product[] }>(Queries.PRODUCTS)
    const storagesQuery = useQuery<{ storages: Storage[] }>(Queries.STORAGES)
    const roomsQuery = useQuery<{ rooms: Room[] }>(Queries.ROOMS)

    console.log('GQL', productsQuery.loading, productsQuery.data, productsQuery.called, productsQuery.error)

    const [removeProductMut] = useMutation<{ removeProduct: Product }, { id: string }>(Mutations.REMOVE_PRODUCT)


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
        <main>
            <section className="masthead-products d-flex">
                <div className="container text-center my-auto">
                    <h1 className="mb-1">{"MES PRODUITS"}</h1>
                </div>
            </section>
            <section>
                <Card>
                    {productsQuery.loading && <Text>{'CHARGEMENT...'}</Text>}
                    <Link to="/ProductFormPage"><Button>{"Add Product"}</Button></Link>
                    {roomsQuery.data && storagesQuery.data && productsQuery.data && <ProductsList rooms={roomsQuery.data?.rooms} storages={storagesQuery.data.storages} products={productsQuery.data.products} onDeleteProduct={removeProductGQL} />}
                </Card>
            </section>
        </main>
    )
}