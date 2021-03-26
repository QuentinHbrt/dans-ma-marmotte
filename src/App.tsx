import React from 'react';
import { Container, Heading } from '@theme-ui/components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProductsPage } from './pages/ProductsPage';
import { RoomsPage } from './pages/RoomsPage';
import { StoragesPage } from './pages/StoragesPage';

function App() {

  return (
    <Router>
      <Container>
        <Navbar />
        <Heading>{"Dans ma Marmotte"}</Heading>
        <Route path={"/ProductsPage"} component={ProductsPage} />
        <Route path={"/RoomsPage"} component={RoomsPage} />
        {console.log('4')}
        <Route path={"/StoragesPage"} component={StoragesPage} />
      </Container>
    </Router>

  );
}

export default App;

