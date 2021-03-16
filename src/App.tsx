import React, { useState } from 'react';
import { Container, Heading } from '@theme-ui/components';
import { Product, Room, Storage } from './api/types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LocalStorage } from './api/localStorage';
import { ProductsPage } from './pages/ProductsPage';
import { RoomsPage } from './pages/RoomsPage';
import { StoragesPage } from './pages/StoragesPage';

function App() {

  const [listOfRooms, setListOfRooms] = useState<Room[]>(LocalStorage.restoreRooms)
  const [listOfProducts, setListOfProducts] = useState<Product[]>(LocalStorage.restoreProducts)
  const [listOfStorages, setListOfStorages] = useState<Storage[]>(LocalStorage.restoreStorages)

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

  return (
    <Router>
      <Container>
        <Navbar />
        <Heading>{"Dans ma Marmotte"}</Heading>
        <Route path={"/ProductsPage"} render={() =>
          <ProductsPage
            products={listOfProducts}
            storages={listOfStorages}
            rooms={listOfRooms}
            onProductsChange={setProducts} />
        } />
        <Route path={"/RoomsPage"} render={() =>
          <RoomsPage
            rooms={listOfRooms}
            onRoomsChange={setRooms}
            storages={listOfStorages} />
        } />
        <Route path={"/StoragesPage"} render={() =>
          <StoragesPage
            rooms={listOfRooms}
            storages={listOfStorages}
            products={listOfProducts}
            onStoragesChange={setStorages} />
        } />
      </Container>
    </Router>

  );
}

export default App;

