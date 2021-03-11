import { Button } from '@theme-ui/components';
import React, { FC } from 'react';
import { Room } from '../api/types';

type RoomItemProps = {
    roomProperty: Room
}

export const RoomItem: FC<RoomItemProps> = (props) => {
    return (
        <li>
            {props.roomProperty.color} <br />
            {props.roomProperty.name}
            <Button>{'DELETE'}</Button>
        </li>
    )
}