import React, { FC, useState } from "react";
import { Room } from "../../api/types";
import { SearchBar } from "../SearchBar/SearchBarElements";
import { RoomItem } from "./RoomItem";
import {
  RoomsListContainer,
  RoomsSearch,
  RoomsLi,
  RoomsUl,
} from "./RoomsElements";

type RoomsListProps = {
  title?: string;
  rooms: Room[];
  onDeleteRoom: (roomToRemove: Room) => void;
};

export const RoomsList: FC<RoomsListProps> = (props) => {
  const arrayOfRooms = [...props.rooms];
  arrayOfRooms.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
  arrayOfRooms.forEach((x) => x);

  const [searchTerm, setSearchTerm] = useState("");
  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem",
  };

  return (
    <RoomsListContainer>
      <RoomsSearch>
        <SearchBar
          style={BarStyling}
          value={searchTerm}
          placeholder={"search"}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </RoomsSearch>
      <RoomsUl>
        <RoomsLi>
          {arrayOfRooms
            .filter((value) => {
              if (searchTerm === "") {
                return value;
              } else if (
                value.name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                return value;
              }
              return false;
            })
            .map((room) => (
              <RoomItem
                key={room.id}
                roomProperty={room}
                onDeleteRoomProperty={props.onDeleteRoom}
              />
            ))}
        </RoomsLi>
      </RoomsUl>
    </RoomsListContainer>
  );
};
