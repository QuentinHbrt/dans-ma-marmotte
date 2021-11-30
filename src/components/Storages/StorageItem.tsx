import { Button } from "../Button/ButtonElement";
import React, { FC } from "react";
import { Room, Storage } from "../../api/types";
import {
  CardTextBody,
  CardTextLocation,
  CardTextTitle,
  CardTextWrapper,
  CardWrapper,
} from "../Card/CardElements";

type StorageItemProps = {
  storageProperty: Storage;
  onDeleteStorageProperty: (storageToRemove: Storage) => void;
  roomProperty?: Room;
};

export const StorageItem: FC<StorageItemProps> = (props) => {
  function handleDelete() {
    console.log("ITEM : delete");
    props.onDeleteStorageProperty(props.storageProperty);
  }

  const style = props.roomProperty
    ? { background: props.roomProperty.color }
    : undefined;

  return (
    <CardWrapper sx={style}>
      <CardTextWrapper>
        <CardTextTitle>{props.storageProperty.name}</CardTextTitle>
        <CardTextLocation>
          {props.roomProperty ? props.roomProperty.name : "pas trouvé"}
        </CardTextLocation>
        <CardTextBody>
          <Button
            to="StoragesPage"
            dark="true"
            primary="true"
            onClick={handleDelete}
          >
            {"DELETE"}
          </Button>
        </CardTextBody>
      </CardTextWrapper>
    </CardWrapper>
  );
};
