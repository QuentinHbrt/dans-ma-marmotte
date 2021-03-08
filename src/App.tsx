import React, { useState } from 'react';
import { Container, Heading } from '@theme-ui/components';
import { ProductsList } from './components/ProductsList';
import { PRODUCTS } from './api/data';
import { ProductForm } from './components/ProductForm';
import { Product } from './api/types';

function App() {

  const [products, setProducts] = useState<Product[]>(PRODUCTS)

  function addProduct(newProduct: Product) {
    const newArrayOfProducts = [...products, newProduct]
    setProducts(newArrayOfProducts);
    // setProducts((currentProducts) => [...currentProducts, newProduct]);
  }

  return (
    <Container>
      <Heading>{"Dans ma Marmotte"}</Heading>
      <ProductsList products={products} />
      <ProductForm onSubmitProduct={addProduct} />
    </Container>
  );
}

export default App;

