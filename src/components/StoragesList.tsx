import React, { FC } from 'react';

import { Storage } from '../api/types';
import { StorageItem } from './StorageItem';

type StoragesListProps = {
    title?: string;
    storages: Storage[];
    onDeleteStorage: (storageToRemove: Storage) => void;
}

export const StoragesList: FC<StoragesListProps> = (props) => {

    return (
        <ul>
            {props.storages.map((storage) =>
                <StorageItem
                    key={storage.id}
                    storageProperty={storage}
                    onDeleteStorageProperty={props.onDeleteStorage} />
            )}
        </ul>
    )
}