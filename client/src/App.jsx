import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import CustomNavbar from "./components/CustomNavbar";
import CustomFooter from "./components/CustomFooter";
import Home from "./components/Home";
import Login from "./components/Login";
import Featured from "./components/Featured";
import Shop from "./components/Shop";
import { FormProvider } from "./contexts/FormContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <>
      <Router>
        <CartProvider>
          <FormProvider>
            <CustomNavbar />
            <Container className="content mt-5">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login-register" element={<Login />} />
                <Route exact path="/featured" element={<Featured />} />
                <Route exact path="/shop" element={<Shop />} />
              </Routes>
            </Container>
            {/* <CustomFooter /> */}
          </FormProvider>
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
