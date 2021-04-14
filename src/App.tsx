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
import { StorageForm } from './components/StorageForm';
import { RoomForm } from './components/RoomForm';
import { ProductForm } from './components/ProductForm';


function App() {

  return (
    <Router>
      <Container>
        <NavBar />
        <Switch >
          <Route exact path={"/"} component={HomeConnected} />
          <Route path={"/ProductsPage"} component={ProductsPage} />
          <Route path={"/RoomsPage"} component={RoomsPage} />
          <Route path={"/StoragesPage"} component={StoragesPage} />
          <Route path={"/StorageForm"} component={StorageForm} />
          <Route path={"/RoomForm"} component={RoomForm} />
          <Route path={"/ProductForm"} component={ProductForm} />
          <Route render={() => <h1>{"PAGE NOT FOUND"}</h1>} />
        </Switch>
        <Footer />
      </Container>
    </Router>

  );
}

export default App;

