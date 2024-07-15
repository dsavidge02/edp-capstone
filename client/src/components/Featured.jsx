import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import PirateImg from "../assets/img/PirateDuck.png";
import SportImg from "../assets/img/SportDuck.png";
import FoodImg from "../assets/img/FoodDuck.png";
import ClassicImg from "../assets/img/ClassicDuck.png";
import AnimalImg from "../assets/img/AnimalDuck.png";

const styleToImage = {
  sports: SportImg,
  food: FoodImg,
  classic: ClassicImg,
  animal: AnimalImg,
  pirate: PirateImg,
};

const Featured = () => {
  const { cartItems, addToCart, removeFromCart, searchCart } = useCart();
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

  const handleCartButton = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <Container fluid className="shop-container">
      <Row>
        <Col>
          <h2>Featured Ducks</h2>
          <Row>
            {featuredDucks.map((product) => (
              <Col key={product._id} sm={4} className="mb-4">
                <Card className="duck-card">
                  <img
                    src={styleToImage[product.duckDetails.style] || ClassicImg}
                    alt={product.duckDetails.style}
                    className={`duck-icon ${product.duckDetails.size}`}
                  />
                  <Card.Body className="duckInfo">
                    <Row className="importantDetails">
                      <Card.Text>Price: ${product.duckDetails.price}</Card.Text>
                    </Row>
                    <Row className="duckDetails">
                      <Col sm={6}>
                        <Card.Text>Size: {product.duckDetails.size}</Card.Text>
                        <Card.Text>
                          Speed: {product.duckDetails.speed}
                        </Card.Text>
                      </Col>
                      <Col sm={6}>
                        <Card.Text>
                          Style: {product.duckDetails.style}
                        </Card.Text>
                        <Card.Text>
                          Condition: {product.duckDetails.condition}
                        </Card.Text>
                      </Col>
                    </Row>
                    <Row className="additionalFeatures border-top pt-3">
                      <Col sm={6}>
                        <Card.Text>
                          In Stock:{" "}
                          {product.additionalFeatures.inStock ? "✔️" : "❌"}
                        </Card.Text>
                        <Card.Text>
                          Featured:{" "}
                          {product.additionalFeatures.isFeatured ? "✔️" : "❌"}
                        </Card.Text>
                      </Col>
                      <Col sm={6}>
                        <Card.Text>
                          Buoyant:{" "}
                          {product.additionalFeatures.buoyancy ? "✔️" : "❌"}
                        </Card.Text>
                        <Card.Text>
                          On Sale:{" "}
                          {product.additionalFeatures.onSale ? "✔️" : "❌"}
                        </Card.Text>
                      </Col>
                    </Row>
                    <Row className="cartButton">
                      <Button
                        onClick={() => handleCartButton(product)}
                        disabled={!product.additionalFeatures.inStock}
                        style={{
                          backgroundColor: searchCart(product)
                            ? "red"
                            : product.additionalFeatures.inStock
                            ? ""
                            : "gray",
                          color: searchCart(product)
                            ? "white"
                            : product.additionalFeatures.inStock
                            ? ""
                            : "black",
                          cursor: product.additionalFeatures.inStock
                            ? "pointer"
                            : "not-allowed",
                        }}
                      >
                        {searchCart(product)
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </Button>
                    </Row>
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
