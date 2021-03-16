import { Button, Card } from '@theme-ui/components';
import React, { FC } from 'react';
import { Room, Storage } from '../api/types';

type StorageItemProps = {
    storageProperty: Storage
    onDeleteStorageProperty: (storageToRemove: Storage) => void
    roomProperty?: Room
}

export const StorageItem: FC<StorageItemProps> = (props) => {

    function handleDelete() {
        console.log('ITEM : delete')
        props.onDeleteStorageProperty(props.storageProperty)
    }

    const style = props.roomProperty ? { background: props.roomProperty.color } : undefined

    return (
        <Card sx={style}>
            {`${props.storageProperty.name} - pièce : ${props.roomProperty ? props.roomProperty.name : 'pas trouvé'}`}
            <Button onClick={handleDelete}>{'DELETE'}</Button>
        </Card>
    )
}
