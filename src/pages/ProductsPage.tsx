import { useQuery } from '@apollo/client';
import { Card, Text } from '@theme-ui/components';
import React, { FC } from 'react';
import { Queries } from '../api/graphqlClient';
import { Product, Room, Storage } from '../api/types';
import { ProductForm } from '../components/ProductForm';
import { ProductsList } from '../components/ProductsList';

type ProductsPageProps = {
    products: Product[]
    storages: Storage[]
    rooms: Room[]
    onProductsChange: (products: Product[]) => void
}

export const ProductsPage: FC<ProductsPageProps> = (props) => {

    const query = useQuery<{ products: Product[] }>(Queries.PRODUCTS)

    console.log('GQL', query.loading, query.data, query.called, query.error)

    function addProduct(newProduct: Product) {
        const newArrayOfProducts = [...props.products, newProduct]
        props.onProductsChange(newArrayOfProducts);
    }


    function removeProduct(productToRemove: Product) {
        const newArrayOfProducts = props.products.filter(product => product.id !== productToRemove.id);
        props.onProductsChange(newArrayOfProducts);
    };

    return (
        <Card>
            {query.loading && <Text>{'CHARGEMENT...'}</Text>}
            {query.data && <ProductsList products={query.data.products} onDeleteProduct={removeProduct} />}
            <ProductForm onSubmitProduct={addProduct} storagesProperty={props.storages} roomsProperty={props.rooms} />
        </Card>
    )
}