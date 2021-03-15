import React, { useState } from 'react';
import { Container, Heading } from '@theme-ui/components';
import { ProductsList } from './components/ProductsList';
import { PRODUCTS } from './api/data';
import { ProductForm } from './components/ProductForm';
import { Product, Room, Storage } from './api/types';
import { RoomForm } from './components/RoomForm';
import { StorageForm } from './components/StorageForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { RoomsList } from './components/RoomsList';
import { StoragesList } from './components/StoragesList';

function App() {

  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [listOfRooms, setListOfRooms] = useState<Room[]>([])
  const [storages, setStorages] = useState<Storage[]>([])

  function removeStorage(storageToRemove: Storage) {
    console.log('APP : delete')
    const newArrayOfStorages = storages.filter(storage => storage.id !== storageToRemove.id);
    console.log(newArrayOfStorages)
    setStorages(newArrayOfStorages);
  };

  function removeProduct(productToRemove: Product) {
    console.log('APP : delete')
    const newArrayOfProducts = products.filter(product => product.id !== productToRemove.id);
    console.log(newArrayOfProducts)
    setProducts(newArrayOfProducts);
  };

  function removeRoom(roomToRemove: Room) {
    console.log('APP : delete')
    const newArrayOfRooms = listOfRooms.filter(room => room.id !== roomToRemove.id);
    console.log(newArrayOfRooms)
    setListOfRooms(newArrayOfRooms);
  };

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
    <Router>
      <Container>
        <Navbar />
        <Heading>{"Dans ma Marmotte"}</Heading>
        <Route path={"/ProductsList"} render={() => <ProductsList products={products} onDeleteProduct={removeProduct} />} />
        <Route path={"/ProductForm"} render={() => <ProductForm onSubmitProduct={addProduct} storagesProperty={storages} roomsProperty={listOfRooms} />} />
        <Route path={"/RoomForm"} render={() => <RoomForm onSubmitRoom={addRoom} />} />
        <Route path={"/StorageForm"} render={() => <StorageForm onSubmitStorage={addStorage} roomsProperty={listOfRooms} />} />
        <Route path={"/RoomsList"} render={() => <RoomsList rooms={listOfRooms} onDeleteRoom={removeRoom} storages={storages} />} />
        <Route path={"/StoragesList"} render={() => <StoragesList storages={storages} onDeleteStorage={removeStorage} rooms={listOfRooms} products={products} />} />
      </Container>
    </Router>

  );
}

export default App;

