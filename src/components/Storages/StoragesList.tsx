import React, { FC, useState } from "react";

import { Room, Storage } from "../../api/types";
import { SearchBar } from "../SearchBar/SearchBarElements";
import { StorageItem } from "./StorageItem";
import {
  StoragesLi,
  StoragesListContainer,
  StoragesSearch,
  StoragesUl,
} from "./StoragesElements";

type StoragesListProps = {
  title?: string;
  storages: Storage[];
  rooms: Room[];
  onDeleteStorage: (storageToRemove: Storage) => void;
};

export const StoragesList: FC<StoragesListProps> = (props) => {
  const arrayOfStorages = [...props.storages];
  arrayOfStorages.sort((a, b) =>
    a.roomId.toLowerCase().localeCompare(b.roomId.toLowerCase())
  );
  arrayOfStorages.forEach((x) => x);

  const [searchTerm, setSearchTerm] = useState("");
  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem",
  };

  return (
    <StoragesListContainer>
      <StoragesSearch>
        <SearchBar
          style={BarStyling}
          value={searchTerm}
          placeholder={"search"}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </StoragesSearch>
      <StoragesUl>
        <StoragesLi>
          {arrayOfStorages
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
            .map((storage) => {
              const foundRoom = props.rooms.find(
                (room) => room.id === storage.roomId
              );
              return (
                <StorageItem
                  key={storage.id}
                  storageProperty={storage}
                  onDeleteStorageProperty={props.onDeleteStorage}
                  roomProperty={foundRoom}
                />
              );
            })}
        </StoragesLi>
      </StoragesUl>
    </StoragesListContainer>
  );
};
