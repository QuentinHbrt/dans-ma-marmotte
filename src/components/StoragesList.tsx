import React, { FC } from 'react';

import { Room, Storage } from '../api/types';
import { StorageItem } from './StorageItem';

type StoragesListProps = {
    title?: string;
    storages: Storage[];
    rooms: Room[];
    onDeleteStorage: (storageToRemove: Storage) => void;
}

export const StoragesList: FC<StoragesListProps> = (props) => {

    const arrayOfStorages = [...props.storages]
    arrayOfStorages.sort((a, b) => a.roomId.toLowerCase().localeCompare(b.roomId.toLowerCase()));
    arrayOfStorages.forEach(x => (x))

    return (
        <ul>
            {
                arrayOfStorages.map((storage) => {
                    const foundRoom = props.rooms.find(room => room.id === storage.roomId)
                    return (
                        <StorageItem
                            key={storage.id}
                            storageProperty={storage}
                            onDeleteStorageProperty={props.onDeleteStorage}
                            roomProperty={foundRoom}
                        />
                    )
                }
                )}
        </ul>
    )
}