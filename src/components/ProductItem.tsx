import { Button } from '@theme-ui/components';
import React, { FC } from 'react';
import { Product } from '../api/types';

type ProductItemProps = {
    product: Product
    onDeleteProductProperty: (ProductToRemove: Product) => void
}

export const ProductItem: FC<ProductItemProps> = (props) => {

    function handleDelete() {
        props.onDeleteProductProperty(props.product)
    }

    return (
        <li>
            {props.product.name}
            {props.product.category}
            <Button onClick={handleDelete}>{'DELETE'}</Button>
        </li>
    )
}