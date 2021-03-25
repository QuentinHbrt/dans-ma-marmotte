import React, { ChangeEvent, FC, useState } from 'react';
import { Input, Select } from 'theme-ui';
import { Room, Storage } from '../api/types';

type StorageFormProperties = {
    onSubmitStorage: (newStorage: Storage) => void
    roomsProperty: Room[]
}

export const StorageForm: FC<StorageFormProperties> = (properties) => {

    const [storageName, setStorageName] = useState('')
    const [selectedRoomId, setSelectedRoomId] = useState('')

    function handleChangeStorageName(event: ChangeEvent<HTMLInputElement>) {
        setStorageName(event.target.value)
    }

    function handleChangeStorageRoom(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedRoomId(event.target.value)
    }

    function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
        if (selectedRoomId === undefined) {
            return
        }
        event.preventDefault();
        const newStorage: Storage = {
            id: Math.random().toString(),
            name: storageName,
            roomId: selectedRoomId
        }
        properties.onSubmitStorage(newStorage)
        setStorageName('')
        setSelectedRoomId('')

    }

    console.log('ROOM', properties.roomsProperty);

    return (
        <form onSubmit={handleSubmit}>
            <label>STORAGE :</label>
            <Input onChange={handleChangeStorageName} value={storageName} placeholder="name" type="text" name="name" id="name" />
            <Select onChange={handleChangeStorageRoom} value={selectedRoomId} >
                <option value={''}>{'Choisir...'}</option>
                {properties.roomsProperty.map((room) => <option key={room.id} value={room.id}>{room.name}</option>)}
            </Select>
            <Input type="submit" value="envoyer" />
        </form>
    )
}