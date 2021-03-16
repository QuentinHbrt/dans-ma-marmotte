import React, { ChangeEvent, FC, useState } from 'react';
import { Input, Select } from 'theme-ui';
import { Room } from '../api/types';

type RoomFormProps = {
    onSubmitRoom: (newRoom: Room) => void
}

const DEFAULT_NAME = ''

const DEFAULT_COLOR = '#ff0000'
const AVAILABLE_COLORS = [
    { name: 'Rouge', value: '#ff0000' },
    { name: 'Vert', value: '#00ff00' },
    { name: 'Bleu', value: '#0000ff' },
    { name: 'Gris', value: '#0f0f0f' },
]

export const RoomForm: FC<RoomFormProps> = (props) => {

    const [roomNameValue, setRoomNameValue] = useState(DEFAULT_NAME)
    const [roomColorValue, setRoomColorValue] = useState(DEFAULT_COLOR)

    function handleChangeNameRoom(event: ChangeEvent<HTMLInputElement>) {
        setRoomNameValue(event.target.value);
    }

    function handleChangeColorRoom(event: ChangeEvent<HTMLSelectElement>) {
        setRoomColorValue(event.target.value);
    }

    function handleSubmit(event: ChangeEvent<HTMLFormElement>) {

        if (roomNameValue === '') {
            return
        }
        event.preventDefault();
        console.log('submit')
        const newRoom: Room = {
            id: Math.random().toString(),
            name: roomNameValue,
            color: roomColorValue
        }
        props.onSubmitRoom(newRoom)
        setRoomNameValue(DEFAULT_NAME);
        setRoomColorValue(DEFAULT_COLOR);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>ROOM :</label>
            <Input onChange={handleChangeNameRoom} value={roomNameValue} placeholder="name" type="text" name="name" id="name" />
            <Select onChange={handleChangeColorRoom} value={roomColorValue} >
                {AVAILABLE_COLORS.map((color) => <option key={color.value} value={color.value}>{color.name}</option>)}
            </Select>
            <Input type="submit" value="envoyer" />
        </form>
    )
}
