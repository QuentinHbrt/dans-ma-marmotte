
import React, { FC } from 'react';
import { Product } from '../api/types';
import { ProductItem } from './ProductItem';

type ProductsListProps = {
    title?: string;
    products: Product[];
    onDeleteProduct: (productToRemove: Product) => void
}

export const ProductsList: FC<ProductsListProps> = (props) => {

    const arrayOfProducts = [...props.products]
    arrayOfProducts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    arrayOfProducts.forEach(x => (x))

    return (
        <ul className="d-flex justify-content-center">
            <li>
                {arrayOfProducts.map((product) => <ProductItem key={product.id} productProperty={product} onDeleteProductProperty={props.onDeleteProduct} />)}
            </li>
        </ul>
    )
}