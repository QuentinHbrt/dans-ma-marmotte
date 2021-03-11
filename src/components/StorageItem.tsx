import { Button } from '@theme-ui/components';
import React, { FC } from 'react';
import { Storage } from '../api/types';

type StorageItemProps = {
    storageProperty: Storage
    onDeleteStorageProperty: (storageToRemove: Storage) => void
}

export const StorageItem: FC<StorageItemProps> = (props) => {

    function handleDelete() {
        console.log('ITEM : delete')
        props.onDeleteStorageProperty(props.storageProperty)
    }

    return (
        <li>
            {props.storageProperty.name}
            <Button onClick={handleDelete}>{'DELETE'}</Button>
        </li>
    )
}
