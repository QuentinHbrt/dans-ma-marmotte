import { Card } from '@theme-ui/components';
import React, { FC } from 'react';
import { Product, Room, Storage } from '../api/types';
import { StorageForm } from '../components/StorageForm';
import { StoragesList } from '../components/StoragesList';

type StoragesPageProps = {
    storages: Storage[]
    rooms: Room[]
    products: Product[]
    onStoragesChange: (storages: Storage[]) => void
}

export const StoragesPage: FC<StoragesPageProps> = (props) => {

    function removeStorage(storageToRemove: Storage) {
        console.log('APP : delete')
        const newArrayOfStorages = props.storages.filter(storage => storage.id !== storageToRemove.id);
        console.log(newArrayOfStorages)
        props.onStoragesChange(newArrayOfStorages);
    };

    function addStorage(newStorage: Storage) {
        const newArrayOfStorages = [...props.storages, newStorage]
        props.onStoragesChange(newArrayOfStorages);
    }


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
            removeStorage(storageToDelete)
        }
    }

    return (
        <Card>
            <StoragesList storages={props.storages} onDeleteStorage={handleDelete} rooms={props.rooms} />
            <StorageForm onSubmitStorage={addStorage} roomsProperty={props.rooms} />
        </Card>
    )
}