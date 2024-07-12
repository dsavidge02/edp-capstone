import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Featured = () => {
  const { addToCart } = useCart();
  const [featuredDucks, setFeaturedDucks] = useState([]);

  useEffect(() => {
    fetchFeaturedDucks();
  }, []);

  const fetchFeaturedDucks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DUCKS_API_URL}/featured`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setFeaturedDucks(data.slice(0, 5)); // Assuming API returns an array of featured ducks
    } catch (error) {
      console.error("Error fetching featured ducks", error);
      // Handle errors here
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log("Item added to cart:", product);
    // Optionally, show a confirmation message or update UI
  };

  return (
    <Container fluid className="shop-container">
      <Row>
        <Col>
          <h2>Featured Ducks</h2>
          <Row>
            {featuredDucks.map((product) => (
              <Col key={product._id} sm={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>Price: ${product.duckDetails.price}</Card.Text>
                    <Card.Text>Size: {product.duckDetails.size}</Card.Text>
                    <Card.Text>Style: {product.duckDetails.style}</Card.Text>
                    <Card.Text>Speed: {product.duckDetails.speed}</Card.Text>
                    <Card.Text>
                      Condition: {product.duckDetails.condition}
                    </Card.Text>
                    <Button onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="mt-4">
            <Link to="/shop">
              <Button variant="primary">Shop All Ducks</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Featured;
