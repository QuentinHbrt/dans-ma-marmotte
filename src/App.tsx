import React from "react";
import "./App.css";
import { Container } from "@theme-ui/components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {} from "reactstrap";
import { Header } from "./pages/Header/Header";
import { ProductsPage } from "./pages/Product/ProductsPage";

import { StoragesPage } from "./pages/Storage/StoragesPage";
import { ProductFormPage } from "./pages/Product/ProductFormPage";

import { RoomFormPage } from "./pages/Room/RoomFormPage";
import { Footer } from "./components/Footer/Footer";
import { RoomsPage } from "./pages/Room/RoomsPage";
import { StoragesFormPage } from "./pages/Storage/StorageFormPage";
import Home from "./pages/Home/Home";
import { Login } from "./components/LogIn/Login";
import NotFound from "./components/NotFoundPage/NotFound";
// import { SignInPage } from "./pages/SignIn/SignInPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ProductsPage" element={<ProductsPage />} />
            <Route path="/ProductFormPage" element={<ProductFormPage />} />
            <Route path="/RoomsPage" element={<RoomsPage />} />
            <Route path="/RoomFormPage" element={<RoomFormPage />} />
            <Route path="/StoragesPage" element={<StoragesPage />} />
            <Route path="/StorageFormPage" element={<StoragesFormPage />} />
            {/* <Route path="/SignInPage" element={SignInPage} />
             */}
            <Route path="/login" element={<Login />} />
            {/* <Route render={() => <h1>{"PAGE NOT FOUND"}</h1>} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
