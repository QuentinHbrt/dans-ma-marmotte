import { Card } from '@theme-ui/components';
import React, { FC } from 'react';
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
            <ProductsList products={props.products} onDeleteProduct={removeProduct} />
            <ProductForm onSubmitProduct={addProduct} storagesProperty={props.storages} roomsProperty={props.rooms} />
        </Card>
    )
}