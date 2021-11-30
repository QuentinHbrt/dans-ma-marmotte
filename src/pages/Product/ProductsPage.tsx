import { useMutation, useQuery } from "@apollo/client";
import { Text } from "@theme-ui/components";
import React, { FC } from "react";
import { Button } from "../../components/Button/ButtonElement";
import { Mutations, Queries } from "../../api/graphqlClient";
import { Product, Room, Storage } from "../../api/types";
import { ProductsList } from "../../components/Products/ProductsList";
import {
  ProductContainer,
  ProductContent,
  ProductH1,
  ProductP,
} from "./ProductElements";

export const ProductsPage: FC = () => {
  const productsQuery = useQuery<{ products: Product[] }>(Queries.PRODUCTS);
  const storagesQuery = useQuery<{ storages: Storage[] }>(Queries.STORAGES);
  const roomsQuery = useQuery<{ rooms: Room[] }>(Queries.ROOMS);

  console.log(
    "GQL",
    productsQuery.loading,
    productsQuery.data,
    productsQuery.called,
    productsQuery.error
  );

  const [removeProductMut] = useMutation<
    { removeProduct: Product },
    { id: string }
  >(Mutations.REMOVE_PRODUCT);

  function removeProductGQL(productToRemove: Product) {
    console.log("CALL REMOVE PRODUCT MUTATION", productToRemove);

    const mesVariables = {
      id: productToRemove.id,
    };
    const mutOptions = {
      variables: mesVariables,
    };
    removeProductMut(mutOptions)
      .then(() => productsQuery.refetch())
      .catch((error) => alert(error));
  }

  return (
    <ProductContainer>
      <ProductContent>
        <ProductH1>{"MES PRODUITS"}</ProductH1>
        <ProductP>
          {productsQuery.loading && <Text>{"CHARGEMENT..."}</Text>}
          <Button to="/ProductFormPage" primary="true" dark="true">
            {"Add Product"}
          </Button>
          {roomsQuery.data && storagesQuery.data && productsQuery.data && (
            <ProductsList
              rooms={roomsQuery.data?.rooms}
              storages={storagesQuery.data.storages}
              products={productsQuery.data.products}
              onDeleteProduct={removeProductGQL}
            />
          )}
        </ProductP>
      </ProductContent>
    </ProductContainer>
  );
};
