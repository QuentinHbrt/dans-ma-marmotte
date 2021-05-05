import React, { FC, useState } from 'react';
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

    const [searchTerm, setSearchTerm] = useState('')
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };

    return (
        <div>
            <input
                style={BarStyling}
                value={searchTerm}
                placeholder={"search"}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {arrayOfRooms.filter((value) => {
                    if (searchTerm === "") {
                        return value
                    } else if (value.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                        return value
                    }
                }).map((room) =>
                    <RoomItem key={room.id}
                        roomProperty={room}
                        onDeleteRoomProperty={props.onDeleteRoom}
                    />)}
            </ul>
        </div>
    )
}