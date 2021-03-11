import { Button } from '@theme-ui/components';
import React, { FC } from 'react';
import { Product } from '../api/types';

type ProductItemProps = {
    product: Product
}

export const ProductItem: FC<ProductItemProps> = (props) => {
    return (
        <li>
            {props.product.name}
            {props.product.category}
            <Button>{'DELETE'}</Button>
        </li>
    )
}