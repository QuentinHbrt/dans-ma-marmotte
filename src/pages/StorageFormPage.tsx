import { useMutation, useQuery } from '@apollo/client'
import { Card, Text } from '@theme-ui/components'
import React, { FC } from 'react'
import { Mutations, Queries } from '../api/graphqlClient'
import { Room, Storage } from '../api/types'
import { StorageForm } from '../components/StorageForm'
import { StoragesList } from '../components/StoragesList'

export const StoragesFormPage: FC = () => {

    const storagesQuery = useQuery<{ storages: Storage[] }>(Queries.STORAGES)
    const roomsQuery = useQuery<{ rooms: Room[] }>(Queries.ROOMS)

    console.log('GQL', storagesQuery.loading, storagesQuery.data, storagesQuery.called, storagesQuery.error)

    const [addStorageMut] = useMutation<{ addStorage: Storage }, Storage>(Mutations.ADD_STORAGE)
    const [removeStorageMut] = useMutation<{ removeStorage: Storage }, { id: string }>(Mutations.REMOVE_STORAGE)

    console.log('RoomQuery', roomsQuery)
    console.log('RoomData', roomsQuery.data)

    function addStorageGQL(newStorage: Storage) {
        const mesVariables = {
            name: newStorage.name,
            roomId: newStorage.roomId,
            id: newStorage.id
        }
        const mutOptions = {
            variables: mesVariables
        }
        addStorageMut(mutOptions).then(() => storagesQuery.refetch()).catch((error) => alert(error))
    }

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
        <body>
            <section className="masthead-storage-form d-flex">
                <div className="container text-center my-auto">
                    <h1 className="mb-1">{"AJOUTER UN RANGEMENT"}</h1>
                </div>
            </section>
            <section>
                <Card>
                    {storagesQuery.loading && <Text>{'CHARGEMENT...'}</Text>}
                    {storagesQuery.data && roomsQuery.data && <StoragesList storages={storagesQuery.data.storages} onDeleteStorage={removeStorageGQL} rooms={roomsQuery.data.rooms} />}
                    {roomsQuery.data && <StorageForm onSubmitStorage={addStorageGQL} roomsProperty={roomsQuery.data.rooms} />}
                </Card>
            </section>
        </body>
    )
}