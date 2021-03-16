import React, { FC } from 'react';

import { Room, Storage } from '../api/types';
import { StorageItem } from './StorageItem';

type StoragesListProps = {
    title?: string;
    storages: Storage[];
    onDeleteStorage: (storageToRemove: Storage) => void;
    rooms: Room[];
}

export const StoragesList: FC<StoragesListProps> = (props) => {
    return (
        <ul>
            {props.storages.map((storage) => {
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