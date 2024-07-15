import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
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

const Recommended = () => {
  const { cartItems, addToCart, searchCart } = useCart();
  const [recommendedDucks, setRecommendedDucks] = useState([]);

  useEffect(() => {
    fetchRecommendedDucks();
  }, [cartItems]);

  const fetchRecommendedDucks = async () => {
    if (cartItems.length > 0) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart_size: cartItems.length,
            cart: cartItems.map((item) => item.productID),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const recommendedIndices = data.recommended_indices || [];

        // Fetch details for each recommended index
        const recommendedDucksData = await Promise.all(
          recommendedIndices.map(async (index) => {
            const duckResponse = await fetch(
              `${import.meta.env.VITE_DUCKS_API_URL}/productID/${index}`
            );
            if (!duckResponse.ok) {
              throw new Error(`HTTP error! status: ${duckResponse.status}`);
            }
            return duckResponse.json();
          })
        );

        setRecommendedDucks(recommendedDucksData);
      } catch (error) {
        console.error("Error fetching recommended ducks", error);
        // Handle errors here
      }
    } else {
      setRecommendedDucks([]);
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
          <h2>Recommended Ducks</h2>
          {cartItems.length === 0 ? (
            <div className="no-recommendations">
              No duck recommendations. Add duck to cart for personalized recommendations.
            </div>
          ) : (
            <Row>
            {recommendedDucks.map((product) => (
              <Col key={product._id} sm={4} className="mb-4">
                <Card className="duck-card">
                  <img
                    src={styleToImage[product.duckDetails.style] || ClassicImg}
                    alt={product.duckDetails.style}
                    className={`duck-icon ${product.duckDetails.size}`}
                  />
                  <Card.Body className="duckInfo">
                    <Row className="importantDetails">
                    <Card.Title>
                          {product.duckName}
                        </Card.Title>
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
          )}
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

export default Recommended;
