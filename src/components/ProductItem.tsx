import { Button } from '@theme-ui/components';
import React, { FC } from 'react';
import { Product, Room, Storage } from '../api/types';

type ProductItemProps = {
    productProperty: Product
    storageProperty?: Storage
    roomProperty?: Room
    onDeleteProductProperty: (ProductToRemove: Product) => void
}

export const ProductItem: FC<ProductItemProps> = (props) => {

    function handleDelete() {
        props.onDeleteProductProperty(props.productProperty)
    }

    return (
        <li>
            {`${props.productProperty.name} - rangement : ${props.storageProperty ? props.storageProperty.name : 'pas trouvé'} - pièce : ${props.roomProperty ? props.roomProperty.name : 'pas trouvé'}`}
            <Button onClick={handleDelete}>{'DELETE'}</Button>
        </li>
    )
}