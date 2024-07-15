import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./css/Checkout.css";
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

const Checkout = () => {
  const { cartItems, removeFromCart, getTotalPrice, clearCart, searchCart } =
    useCart();

  // State for order form inputs and submission status
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    creditCardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DUCKS_API_URL}/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Checkout response:", data);
      clearCart();
      setSubmitMessage("Order submitted successfully");
    } catch (error) {
      console.error("Error submitting checkout:", error);
      setSubmitMessage("Order not submitted");
    } finally {
      setSubmitting(false);
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
    <Container fluid className="checkout-container">
      <Row>
        {/* Left side - Cart display */}
        <Col sm={4} className="cart">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <h3>Total Price : ${getTotalPrice()}</h3>
              <ul>
                {cartItems.map((product) => (
                  <Col key={product._id} sm={4} className="mb-4">
                    <Card className="duck-card">
                      <img
                        src={
                          styleToImage[product.duckDetails.style] || ClassicImg
                        }
                        alt={product.duckDetails.style}
                        className={`duck-icon ${product.duckDetails.size}`}
                      />
                      <Card.Body className="duckInfo">
                        <Row className="importantDetails">
                          <Card.Text>
                            Price: ${product.duckDetails.price}
                          </Card.Text>
                        </Row>
                        <Row className="duckDetails">
                          <Col sm={6}>
                            <Card.Text>
                              Size: {product.duckDetails.size}
                            </Card.Text>
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
                              {product.additionalFeatures.isFeatured
                                ? "✔️"
                                : "❌"}
                            </Card.Text>
                          </Col>
                          <Col sm={6}>
                            <Card.Text>
                              Buoyant:{" "}
                              {product.additionalFeatures.buoyancy
                                ? "✔️"
                                : "❌"}
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
              </ul>
            </>
          )}
        </Col>
        {/* Right side - Order form */}
        <Col sm={8}>
          <Card className="order-card">
            <Card.Body>
              <h2>Shipping Information</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={orderDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={orderDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    value={orderDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City/Town</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city/town"
                    name="city"
                    value={orderDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter state"
                    name="state"
                    value={orderDetails.state}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formZip">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter zip code"
                    name="zip"
                    value={orderDetails.zip}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCreditCardNumber">
                  <Form.Label>Credit Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter credit card number"
                    name="creditCardNumber"
                    value={orderDetails.creditCardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formExpirationDate">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    name="expirationDate"
                    value={orderDetails.expirationDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCVV">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter CVV"
                    name="cvv"
                    value={orderDetails.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Place Order"}
                </Button>
                {submitMessage && (
                  <p
                    className={`mt-3 ${
                      submitMessage.startsWith("Order submitted")
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
