import React, { FC } from "react";
import { Room } from "../../api/types";
import { Button } from "../Button/ButtonElement";
import {
  CardTextBody,
  CardTextTitle,
  CardTextWrapper,
  CardWrapper,
} from "../Card/CardElements";

type RoomItemProps = {
  roomProperty: Room;
  onDeleteRoomProperty: (roomToRemove: Room) => void;
};

export const RoomItem: FC<RoomItemProps> = (props) => {
  function handleDelete() {
    props.onDeleteRoomProperty(props.roomProperty);
  }

  return (
    <CardWrapper sx={{ background: props.roomProperty.color }}>
      <CardTextWrapper>
        <CardTextTitle>{props.roomProperty.name}</CardTextTitle>
        <CardTextBody>
          <Button
            to="RoomFormPage"
            primary="true"
            dark="true"
            onClick={handleDelete}
          >
            {"DELETE"}
          </Button>
        </CardTextBody>
      </CardTextWrapper>
    </CardWrapper>
  );
};
