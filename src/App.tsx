import React, { useState } from 'react';
import { Container, Heading } from '@theme-ui/components';
import { ProductsList } from './components/ProductsList';
import { PRODUCTS } from './api/data';
import { ProductForm } from './components/ProductForm';
import { Product, Room, Storage } from './api/types';
import { RoomForm } from './components/RoomForm';
import { StorageForm } from './components/StorageForm';

function App() {

  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [listOfRooms, setListOfRooms] = useState<Room[]>([])
  const [storages, setStorages] = useState<Storage[]>([])

  function addProduct(newProduct: Product) {
    const newArrayOfProducts = [...products, newProduct]
    setProducts(newArrayOfProducts);
    // setProducts((currentProducts) => [...currentProducts, newProduct]);
  }

  function addRoom(newRoom: Room) {
    const newArrayOfRooms = [...listOfRooms, newRoom]
    setListOfRooms(newArrayOfRooms);
  }

  function addStorage(newStorage: Storage) {
    const newArrayOfStorages = [...storages, newStorage]
    setStorages(newArrayOfStorages);
  }

  console.log('rooms', listOfRooms)
  console.log('storages', storages)

  return (
    <Container>
      <Heading>{"Dans ma Marmotte"}</Heading>
      <ProductsList products={products} />
      <ProductForm onSubmitProduct={addProduct} storagesProperty={storages} />
      <RoomForm onSubmitRoom={addRoom} />
      <StorageForm onSubmitStorage={addStorage} roomsProperty={listOfRooms} />
    </Container>
  );
}

export default App;

