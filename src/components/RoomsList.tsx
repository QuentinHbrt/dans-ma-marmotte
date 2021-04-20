import React, { FC } from 'react';
import { Room } from '../api/types';
import { RoomItem } from './RoomItem';

type RoomsListProps = {
    title?: string;
    rooms: Room[];
    onDeleteRoom: (roomToRemove: Room) => void
}

export const RoomsList: FC<RoomsListProps> = (props) => {

    const arrayOfRooms = [...props.rooms]
    arrayOfRooms.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    arrayOfRooms.forEach(x => (x))

    return (
        <ul>
            {arrayOfRooms.map((room) =>
                <RoomItem key={room.id}
                    roomProperty={room}
                    onDeleteRoomProperty={props.onDeleteRoom}
                />)}
        </ul>
    )
}