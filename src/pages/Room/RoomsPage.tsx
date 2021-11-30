import { useMutation, useQuery } from "@apollo/client";
import { Text } from "@theme-ui/components";
import React, { FC } from "react";
import { Room } from "../../api/types";
import { RoomsList } from "../../components/Rooms/RoomsList";
import { Mutations, Queries } from "../../api/graphqlClient";
import { RoomContainer, RoomContent, RoomH1, RoomP } from "./RoomElements";
import { Button } from "../../components/Button/ButtonElement";

export const RoomsPage: FC = () => {
  const roomsQuery = useQuery<{ rooms: Room[] }>(Queries.ROOMS);

  console.log(
    "GQL",
    roomsQuery.loading,
    roomsQuery.data,
    roomsQuery.called,
    JSON.stringify(roomsQuery.error)
  );

  const [removeRoomMut] = useMutation<{ removeRoom: Room }, { id: string }>(
    Mutations.REMOVE_ROOM
  );

  function removeRoomGQL(roomToRemove: Room) {
    const mesVariables = {
      id: roomToRemove.id,
    };
    const mutOptions = {
      variables: mesVariables,
    };
    removeRoomMut(mutOptions)
      .then(() => roomsQuery.refetch())
      .catch((error) => alert(error));
  }

  return (
    <>
      <RoomContainer>
        <RoomContent>
          <RoomH1>{"MES ROOMS"}</RoomH1>
          <RoomP>
            {roomsQuery.loading && <Text>{"CHARGEMENT..."}</Text>}
            <Button to="RoomFormPage" primary="true" dark="true">
              {"AddRoom"}
            </Button>
            {roomsQuery.data && (
              <RoomsList
                rooms={roomsQuery.data.rooms}
                onDeleteRoom={removeRoomGQL}
              />
            )}
          </RoomP>
        </RoomContent>
      </RoomContainer>
    </>
  );
};
