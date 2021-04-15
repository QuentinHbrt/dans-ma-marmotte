
import React, { FC } from 'react';
import { Product } from '../api/types';
import { ProductItem } from './ProductItem';

type ProductsListProps = {
    title?: string;
    products: Product[];
    onDeleteProduct: (productToRemove: Product) => void
}

export const ProductsList: FC<ProductsListProps> = (props) => {
    return (
        <ul className="d-flex justify-content-center">
            <li>
                {props.products.map((product) => <ProductItem key={product.id} productProperty={product} onDeleteProductProperty={props.onDeleteProduct} />)}
            </li>
        </ul>
    )
}