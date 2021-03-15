import React, { useState } from 'react';
import { Container, Heading } from '@theme-ui/components';
import { ProductsList } from './components/ProductsList';
import { ProductForm } from './components/ProductForm';
import { Product, Room, Storage } from './api/types';
import { RoomForm } from './components/RoomForm';
import { StorageForm } from './components/StorageForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { RoomsList } from './components/RoomsList';
import { StoragesList } from './components/StoragesList';
import { LocalStorage } from './api/localStorage';

function App() {

  const [listOfRooms, setListOfRooms] = useState<Room[]>(LocalStorage.restoreRooms)
  const [listOfStorages, setListOfStorages] = useState<Storage[]>(LocalStorage.restoreStorages)
  const [listOfProducts, setListOfProducts] = useState<Product[]>(LocalStorage.restoreProducts)

  function setProducts(products: Product[]) {
    setListOfProducts(products)
    LocalStorage.storeProducts(products)
  }

  function setRooms(rooms: Room[]) {
    setListOfRooms(rooms)
    LocalStorage.storeRooms(rooms)
  }

  function setStorages(storages: Storage[]) {
    setListOfStorages(storages)
    LocalStorage.storeStorages(storages)
  }

  function removeStorage(storageToRemove: Storage) {
    console.log('APP : delete')
    const newArrayOfStorages = listOfStorages.filter(storage => storage.id !== storageToRemove.id);
    console.log(newArrayOfStorages)
    setStorages(newArrayOfStorages);
  };

  function removeProduct(productToRemove: Product) {
    console.log('APP : delete')
    const newArrayOfProducts = listOfProducts.filter(product => product.id !== productToRemove.id);
    console.log(newArrayOfProducts)
    setProducts(newArrayOfProducts);
  };

  function removeRoom(roomToRemove: Room) {
    console.log('APP : delete')
    const newArrayOfRooms = listOfRooms.filter(room => room.id !== roomToRemove.id);
    console.log(newArrayOfRooms)
    setRooms(newArrayOfRooms);
  };

  function addProduct(newProduct: Product) {
    const newArrayOfProducts = [...listOfProducts, newProduct]
    setProducts(newArrayOfProducts);
  }

  function addRoom(newRoom: Room) {
    const newArrayOfRooms = [...listOfRooms, newRoom]
    setRooms(newArrayOfRooms);
  }

  function addStorage(newStorage: Storage) {
    const newArrayOfStorages = [...listOfStorages, newStorage]
    setStorages(newArrayOfStorages);
  }

  console.log('rooms', listOfRooms)
  console.log('storages', listOfStorages)

  return (
    <Router>
      <Container>
        <Navbar />
        <Heading>{"Dans ma Marmotte"}</Heading>
        <Route path={"/ProductsList"} render={() => <ProductsList products={listOfProducts} onDeleteProduct={removeProduct} />} />
        <Route path={"/ProductForm"} render={() => <ProductForm onSubmitProduct={addProduct} storagesProperty={listOfStorages} roomsProperty={listOfRooms} />} />
        <Route path={"/RoomForm"} render={() => <RoomForm onSubmitRoom={addRoom} />} />
        <Route path={"/StorageForm"} render={() => <StorageForm onSubmitStorage={addStorage} roomsProperty={listOfRooms} />} />
        <Route path={"/RoomsList"} render={() => <RoomsList rooms={listOfRooms} onDeleteRoom={removeRoom} storages={listOfStorages} />} />
        <Route path={"/StoragesList"} render={() => <StoragesList storages={listOfStorages} onDeleteStorage={removeStorage} rooms={listOfRooms} products={listOfProducts} />} />
      </Container>
    </Router>

  );
}

export default App;

