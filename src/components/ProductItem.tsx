import React, { FC } from 'react';
import { Product } from '../api/types';

type ProductItemProps = {
    readonly product: Product
}

export const ProductItem: FC<ProductItemProps> = (props) => {
    return (
        <li>
            {props.product.name}
            {props.product.category}
        </li>
    )
}
