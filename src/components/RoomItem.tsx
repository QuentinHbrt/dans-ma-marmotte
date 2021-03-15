import { Button, Card } from '@theme-ui/components';
import React, { FC } from 'react';
import { Room } from '../api/types';

type RoomItemProps = {
    roomProperty: Room
    onDeleteRoomProperty: (roomToRemove: Room) => void
}

export const RoomItem: FC<RoomItemProps> = (props) => {

    function handleDelete() {
        props.onDeleteRoomProperty(props.roomProperty)
    }

    return (
        <Card sx={{ background: props.roomProperty.color }}>
            {props.roomProperty.name}
            <Button onClick={handleDelete}>{'DELETE'}</Button>
        </Card>
    )
}