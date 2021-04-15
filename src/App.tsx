import React from 'react';
import './App.scss'
import { Container } from '@theme-ui/components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/Navbar';
import { } from 'reactstrap';
import { HomeConnected } from './pages/HomeConnected';
import { ProductsPage } from './pages/ProductsPage';
import { RoomsPage } from './pages/RoomsPage';
import { StoragesPage } from './pages/StoragesPage';
import { Footer } from './components/Footer';
import { ProductFormPage } from './pages/ProductFormPage';
import { StoragesFormPage } from './pages/StorageFormPage';
import { RoomFormPage } from './pages/RoomFormPage';

function App() {

  return (
    <Router>
      <Container>
        <NavBar />
        <Switch >
          <Route exact path={"/"} component={HomeConnected} />
          <Route path={"/ProductsPage"} component={ProductsPage} />
          <Route path={"/ProductFormPage"} component={ProductFormPage} />
          <Route path={"/RoomsPage"} component={RoomsPage} />
          <Route path={"/RoomFormPage"} component={RoomFormPage} />
          <Route path={"/StoragesPage"} component={StoragesPage} />
          <Route path={"/StorageFormPage"} component={StoragesFormPage} />
          <Route render={() => <h1>{"PAGE NOT FOUND"}</h1>} />
        </Switch>
        <Footer />
      </Container>
    </Router>

  );
}

export default App;

