import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Text } from '@theme-ui/components';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Mutations, Queries } from '../api/graphqlClient';
import { Room, Storage } from '../api/types';
import { StoragesList } from '../components/StoragesList';


export const StoragesPage: FC = () => {

    const storagesQuery = useQuery<{ storages: Storage[] }>(Queries.STORAGES)
    const roomsQuery = useQuery<{ rooms: Room[] }>(Queries.ROOMS)

    console.log('GQL', storagesQuery.loading, storagesQuery.data, storagesQuery.called, storagesQuery.error)

    const [removeStorageMut] = useMutation<{ removeStorage: Storage }, { id: string }>(Mutations.REMOVE_STORAGE)

    console.log('RoomQuery', roomsQuery)
    console.log('RoomData', roomsQuery.data)

    function removeStorageGQL(storageToRemove: Storage) {
        const mesVariables = {
            id: storageToRemove.id
        }
        const mutOptions = {
            variables: mesVariables
        }
        removeStorageMut(mutOptions).then(() => storagesQuery.refetch()).catch((error) => alert(error))
    }

    return (
        <main>
            <section className="masthead-storages d-flex">
                <div className="container text-center my-auto">
                    <h1 className="mb-1">{"MES RANGEMENTS"}</h1>
                </div>
            </section>
            <section>
                <Card>
                    {storagesQuery.loading && <Text>{'CHARGEMENT...'}</Text>}
                    <Link to="/StorageFormPage"><Button>{"Add Storage"}</Button></Link>
                    {storagesQuery.data && roomsQuery.data && <StoragesList storages={storagesQuery.data.storages} onDeleteStorage={removeStorageGQL} rooms={roomsQuery.data.rooms} />}
                </Card>
            </section>
        </main>

    )
}