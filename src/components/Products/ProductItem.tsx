import { Button } from "../Button/ButtonElement";
import React, { FC } from "react";
import { Product, Room, Storage } from "../../api/types";
import {
  CardTextBody,
  CardTextLocation,
  CardTextTitle,
  CardTextWrapper,
  CardWrapper,
} from "../Card/CardElements";

type ProductItemProps = {
  productProperty: Product;
  storageProperty?: Storage;
  roomProperty?: Room;
  onDeleteProductProperty: (ProductToRemove: Product) => void;
};

export const ProductItem: FC<ProductItemProps> = (props) => {
  function handleDelete() {
    props.onDeleteProductProperty(props.productProperty);
  }

  return (
    <CardWrapper>
      <CardTextWrapper>
        <CardTextTitle>{`${props.productProperty.name}`}</CardTextTitle>
        <CardTextLocation>{`Rangement : ${
          props.storageProperty ? props.storageProperty.name : "pas trouvé"
        } Pièce : ${
          props.roomProperty ? props.roomProperty.name : "pas trouvé"
        }`}</CardTextLocation>
        <CardTextBody>
          <Button
            to="ProductsPage"
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
