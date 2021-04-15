import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Text } from '@theme-ui/components';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Mutations, Queries } from '../api/graphqlClient';
import { Room } from '../api/types';
import { RoomsList } from '../components/RoomsList';


export const RoomsPage: FC = () => {

    const roomsQuery = useQuery<{ rooms: Room[] }>(Queries.ROOMS)

    console.log('GQL', roomsQuery.loading, roomsQuery.data, roomsQuery.called, JSON.stringify(roomsQuery.error))

    const [removeRoomMut] = useMutation<{ removeRoom: Room }, { id: string }>(Mutations.REMOVE_ROOM)


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
        <body>
            <section className="masthead-rooms d-flex">
                <div className="container text-center my-auto">
                    <h1 className="mb-1">{"MES PIECES"}</h1>
                </div>
            </section>
            <section>
                <Card>
                    {roomsQuery.loading && <Text>{'CHARGEMENT...'}</Text>}
                    <Link to="/RoomFormPage"><Button>{"Add Room"}</Button></Link>
                    {roomsQuery.data && <RoomsList rooms={roomsQuery.data.rooms} onDeleteRoom={removeRoomGQL} />}
                </Card>
            </section>
        </body>
    )
}