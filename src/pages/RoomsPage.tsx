import { Card } from '@theme-ui/components';
import React, { FC } from 'react';
import { Room, Storage } from '../api/types';
import { RoomForm } from '../components/RoomForm';
import { RoomsList } from '../components/RoomsList';

type RoomsPageProps = {
    rooms: Room[]
    storages: Storage[]
    onRoomsChange: (rooms: Room[]) => void
}

export const RoomsPage: FC<RoomsPageProps> = (props) => {

    function removeRoom(roomToRemove: Room) {
        const newArrayOfRooms = props.rooms.filter(room => room.id !== roomToRemove.id);
        props.onRoomsChange(newArrayOfRooms);
    };

    function addRoom(newRoom: Room) {
        const newArrayOfRooms = [...props.rooms, newRoom]
        props.onRoomsChange(newArrayOfRooms);
    }


    function handleDelete(roomToDelete: Room) {
        let count = 0;

        // pour chaque storage comparer le .roomid avec l'id de la room à supprimer
        props.storages.forEach((storage) => {
            if (storage.roomId === roomToDelete.id) {
                count = count + 1
            }
        })

        // const count = props.storages.reduce((counter, storage) => (storage.roomId === roomToDelete.id ? counter + 1 : counter), 0)

        if (count > 0) {
            alert(`La pièce ${roomToDelete.name} est utilisée par ${count} rangement(s)`)
        } else {
            removeRoom(roomToDelete)
        }
    }

    return (
        <Card>
            <RoomsList rooms={props.rooms} onDeleteRoom={handleDelete} />
            <RoomForm onSubmitRoom={addRoom} />
        </Card>
    )
}