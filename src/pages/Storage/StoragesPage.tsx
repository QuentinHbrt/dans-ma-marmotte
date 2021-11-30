import { useMutation, useQuery } from "@apollo/client";
import { Text } from "@theme-ui/components";
import { Button } from "../../components/Button/ButtonElement";
import React, { FC } from "react";
import { Mutations, Queries } from "../../api/graphqlClient";
import { Room, Storage } from "../../api/types";
import { StoragesList } from "../../components/Storages/StoragesList";
import { StorageContainer, StorageContent, StorageH1 } from "./StorageElements";

export const StoragesPage: FC = () => {
  const storagesQuery = useQuery<{ storages: Storage[] }>(Queries.STORAGES);
  const roomsQuery = useQuery<{ rooms: Room[] }>(Queries.ROOMS);

  console.log(
    "GQL",
    storagesQuery.loading,
    storagesQuery.data,
    storagesQuery.called,
    storagesQuery.error
  );

  const [removeStorageMut] = useMutation<
    { removeStorage: Storage },
    { id: string }
  >(Mutations.REMOVE_STORAGE);

  console.log("RoomQuery", roomsQuery);
  console.log("RoomData", roomsQuery.data);

  function removeStorageGQL(storageToRemove: Storage) {
    const mesVariables = {
      id: storageToRemove.id,
    };
    const mutOptions = {
      variables: mesVariables,
    };
    removeStorageMut(mutOptions)
      .then(() => storagesQuery.refetch())
      .catch((error) => alert(error));
  }

  return (
    <StorageContainer>
      <StorageContent>
        <StorageH1>{"MES RANGEMENTS"}</StorageH1>
        {storagesQuery.loading && <Text>{"CHARGEMENT..."}</Text>}
        <Button to="StorageFormPage" primary="true" dark="true">
          {"ADD STORAGE"}
        </Button>
        {storagesQuery.data && roomsQuery.data && (
          <StoragesList
            storages={storagesQuery.data.storages}
            onDeleteStorage={removeStorageGQL}
            rooms={roomsQuery.data.rooms}
          />
        )}
      </StorageContent>
    </StorageContainer>
  );
};
