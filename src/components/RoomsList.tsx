import React, { FC } from 'react';
import { Room } from '../api/types';
import { RoomItem } from './RoomItem';

type RoomsListProps = {
    title?: string;
    rooms: Room[];
    onDeleteRoom: (roomToRemove: Room) => void
}

export const RoomsList: FC<RoomsListProps> = (props) => {
    return (
        <ul>
            {props.rooms.map((room) =>
                <RoomItem key={room.id}
                    roomProperty={room}
                    onDeleteRoomProperty={props.onDeleteRoom}
                />)}
        </ul>
    )
}