import { useMutation, useQuery } from "@apollo/client";
// import { Card } from "../../components/Card/CardElements";
import React, { FC } from "react";
import { Mutations, Queries } from "../../api/graphqlClient";
import { Product, Room, Storage } from "../../api/types";
import { ProductForm } from "../../components/Products/ProductForm";
import { ProductsList } from "../../components/Products/ProductsList";
import { ProductContainer, ProductContent, ProductH1 } from "./ProductElements";
// import { Card } from "../../components/Card/Card";
import { Text } from "@theme-ui/components";

export const ProductFormPage: FC = () => {
  const productsQuery = useQuery<{ products: Product[] }>(Queries.PRODUCTS);
  const storagesQuery = useQuery<{ storages: Storage[] }>(Queries.STORAGES);
  const roomsQuery = useQuery<{ rooms: Room[] }>(Queries.ROOMS);

  const [addProductMut] = useMutation<{ addProduct: Product }, Product>(
    Mutations.ADD_PRODUCT
  );
  const [removeProductMut] = useMutation<
    { removeProduct: Product },
    { id: string }
  >(Mutations.REMOVE_PRODUCT);

  function addProductGQL(newProduct: Product) {
    console.log("CALL ADD PRODUCT MUTATION", newProduct);

    const mesVariables = {
      id: newProduct.id,
      name: newProduct.name,
      category: newProduct.category,
      storageId: newProduct.storageId,
    };
    const mutOptions = {
      variables: mesVariables,
    };
    addProductMut(mutOptions)
      .then(() => productsQuery.refetch())
      .catch((error) => alert(error));
  }

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
      <ProductH1>{"AJOUTER UN PRODUIT"}</ProductH1>
      <ProductContent>
        {productsQuery.loading && <Text>{"CHARGEMENT..."}</Text>}
        {roomsQuery.data && storagesQuery.data && productsQuery.data && (
          <ProductsList
            rooms={roomsQuery.data?.rooms}
            storages={storagesQuery.data.storages}
            products={productsQuery.data.products}
            onDeleteProduct={removeProductGQL}
          />
        )}
        {storagesQuery.data && roomsQuery.data && (
          <ProductForm
            onSubmitProduct={addProductGQL}
            storagesProperty={storagesQuery.data.storages}
            roomsProperty={roomsQuery.data.rooms}
          />
        )}
      </ProductContent>
    </ProductContainer>
  );
};
