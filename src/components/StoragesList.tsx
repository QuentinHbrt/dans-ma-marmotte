import React, { FC } from 'react';

import { Product, Room, Storage } from '../api/types';
import { StorageItem } from './StorageItem';

type StoragesListProps = {
    title?: string;
    storages: Storage[];
    onDeleteStorage: (storageToRemove: Storage) => void;
    rooms: Room[];
    products: Product[];
}

export const StoragesList: FC<StoragesListProps> = (props) => {

    function handleDelete(storageToDelete: Storage) {
        let count = 0;
        props.products.forEach((product) => {
            if (product.storageId === storageToDelete.id) {
                count = count + 1
            }
        })
        if (count > 0) {
            alert(`le rangement ${storageToDelete.name} est utilisé par ${count} produit(s)`)
        } else {
            props.onDeleteStorage(storageToDelete)
        }
    }
    return (
        <ul>
            {props.storages.map((storage) => {
                const foundRoom = props.rooms.find(room => room.id === storage.roomId)
                return (
                    <StorageItem
                        key={storage.id}
                        storageProperty={storage}
                        onDeleteStorageProperty={handleDelete}
                        roomProperty={foundRoom}
                    />
                )
            }

            )}
        </ul>
    )
}