import { useMutation, useQuery } from '@apollo/client';
import { Card, Text } from '@theme-ui/components';
import React, { FC } from 'react';
import { Mutations, Queries } from '../api/graphqlClient';
import { Product, Room, Storage } from '../api/types';
import { ProductForm } from '../components/ProductForm';
import { ProductsList } from '../components/ProductsList';

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
        <Card>
            {productsQuery.loading && <Text>{'CHARGEMENT...'}</Text>}
            {productsQuery.data && <ProductsList products={productsQuery.data.products} onDeleteProduct={removeProductGQL} />}
            {storagesQuery.data && roomsQuery.data && <ProductForm onSubmitProduct={addProductGQL} storagesProperty={storagesQuery.data.storages} roomsProperty={roomsQuery.data.rooms} />}
        </Card>
    )
}