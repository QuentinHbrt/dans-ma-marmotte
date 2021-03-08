import React from 'react';
import { Container, Heading } from '@theme-ui/components';
import { ProductsList } from './components/ProductsList';
import { PRODUCTS } from './api/data';

function App() {
  return (
    <Container>
      <Heading>{"Dans ma Marmotte"}</Heading>
      <ProductsList products={PRODUCTS} />
    </Container>
  );
}

export default App;
