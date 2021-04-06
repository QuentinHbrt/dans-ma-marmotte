import { useMutation, useQuery } from '@apollo/client';
import { Box, Text } from '@theme-ui/components';
import React, { FC } from 'react';
import { Mutations, Queries } from '../api/graphqlClient';
import { Room } from '../api/types';
import { RoomForm } from '../components/RoomForm';
import { RoomsList } from '../components/RoomsList';


export const RoomsPage: FC = () => {

    const roomsQuery = useQuery<{ rooms: Room[] }>(Queries.ROOMS)

    console.log('GQL', roomsQuery.loading, roomsQuery.data, roomsQuery.called, JSON.stringify(roomsQuery.error))

    const [addRoomMut] = useMutation<{ addRoom: Room }, Room>(Mutations.ADD_ROOM)
    const [removeRoomMut] = useMutation<{ removeRoom: Room }, { id: string }>(Mutations.REMOVE_ROOM)

    function addRoomGQL(newRoom: Room) {
        const mesVariables = {
            name: newRoom.name,
            color: newRoom.color,
            id: newRoom.id
        }
        const mutOptions = {
            variables: mesVariables
        }
        addRoomMut(mutOptions).then(() => roomsQuery.refetch()).catch((error) => alert(error))
    }

    function removeRoomGQL(roomToRemove: Room) {
        const mesVariables = {
            id: roomToRemove.id
        }
        const mutOptions = {
            variables: mesVariables
        }
        removeRoomMut(mutOptions).then(() => roomsQuery.refetch()).catch((error) => alert(error))
    }

    return (
        <Box>
            {roomsQuery.loading && <Text>{'CHARGEMENT...'}</Text>}
            {roomsQuery.data && <RoomsList rooms={roomsQuery.data.rooms} onDeleteRoom={removeRoomGQL} />}
            <RoomForm onSubmitRoom={addRoomGQL} />
        </Box>
    )
}