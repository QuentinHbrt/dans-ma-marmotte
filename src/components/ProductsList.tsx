
import React, { FC } from 'react';
import { Product } from '../api/types';
import { ProductItem } from './ProductItem';

type ProductsListProps = {
    title?: string;
    products: Product[];
}

export const ProductsList: FC<ProductsListProps> = (props) => {
    return (
        <ul>
            {props.products.map((product) => <ProductItem key={product.id} product={product} />)}
        </ul>
    )
}