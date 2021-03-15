import React, { FC } from 'react';
import { Room, Storage } from '../api/types';
import { RoomItem } from './RoomItem';

type RoomsListProps = {
    title?: string;
    rooms: Room[];
    onDeleteRoom: (roomToRemove: Room) => void
    storages: Storage[];
}

export const RoomsList: FC<RoomsListProps> = (props) => {

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
            props.onDeleteRoom(roomToDelete)
        }
    }

    return (
        <ul>
            {props.rooms.map((room) =>
                <RoomItem key={room.id}
                    roomProperty={room}
                    onDeleteRoomProperty={handleDelete}
                />)}
        </ul>
    )
}