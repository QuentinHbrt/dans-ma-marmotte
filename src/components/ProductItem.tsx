import { Button } from '@theme-ui/components';
import React, { FC } from 'react';
import { Product } from '../api/types';

type ProductItemProps = {
    productProperty: Product
    onDeleteProductProperty: (ProductToRemove: Product) => void
}

export const ProductItem: FC<ProductItemProps> = (props) => {

    function handleDelete() {
        props.onDeleteProductProperty(props.productProperty)
    }

    return (
        <li>
            {props.productProperty.name}
            <Button onClick={handleDelete}>{'DELETE'}</Button>
        </li>
    )
}