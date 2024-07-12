import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Recommended = () => {
  const { cartItems, removeFromCart, searchCart } = useCart();

  return (
    <Container>
      <p>Testing</p>
    </Container>
  );
};

export default Recommended;
