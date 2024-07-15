import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./css/Checkout.css";

const Checkout = () => {
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();

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

  const handleRemoveFromCart = (item) => {
    console.log("Removing item:", item.productName);
    removeFromCart(item);
  };

  const handleExpirationDateChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      expirationDate: value,
    }));
  };

  const stateIDs = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL",
    "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
    "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
    "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  return (
    <Container fluid className="checkout-container">
      <Row>
        {/* right side */}
        <Col sm={4} className="cart">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <h3>Total Price : ${getTotalPrice()}</h3>
              <ul>
                {cartItems.map((item) => (
                  <li key={item._id}>
                    {item.productName} - ${item.duckDetails.price}
                    <Button
                      variant="danger"
                      className="ml-2"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Col>
        {/* // right side */}
        <Col sm={8}>
          <Card className="order-card">
            <Card.Body>
              <h2>Shipping Information</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
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

            <Row className="mb-3">
            <Col sm={6}>
                <Form.Group controlId="formState" className="d-flex align-items-center">
                <Form.Label style={{ marginRight: '15px', marginBottom: '0' }}>State</Form.Label> {/* Inline style for margin */}
                <Form.Control
                    as="select"
                    name="state"
                    value={orderDetails.state}
                    onChange={handleInputChange}
                    required
                    className="stateBox"
                >
                    <option value="">Select a state</option>
                    {stateIDs.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                    ))}
                </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group controlId="formZip" className="d-flex align-items-center">
                <Form.Label style={{ marginRight: '15px', marginBottom: '0' }}>Zip Code</Form.Label> {/* Inline style for margin */}
                <Form.Control
                    type="text"
                    placeholder="Enter zip"
                    name="zip"
                    value={orderDetails.zip}
                    onChange={handleInputChange}
                    required
                    pattern="\d{5}"
                    maxLength="5"
                    className="zipBox"
                />
                </Form.Group>
            </Col>
            </Row>
                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group controlId="formCreditCardNumber">
                      <Form.Label>Credit Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter credit card number"
                        name="creditCardNumber"
                        value={orderDetails.creditCardNumber}
                        onChange={handleInputChange}
                        required
                        pattern="\d{16}"
                        maxLength="16"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group controlId="formExpirationDate">
                      <Form.Label>Expiration Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM/YY"
                        name="expirationDate"
                        value={orderDetails.expirationDate}
                        onChange={handleExpirationDateChange}
                        required
                        maxLength="5"
                        className="expirationDateBox"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group controlId="formCVV">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="CVV"
                        name="cvv"
                        value={orderDetails.cvv}
                        onChange={handleInputChange}
                        required
                        pattern="\d{3}"
                        maxLength="3"
                        className="cvvBox"
                      />
                    </Form.Group>
                  </Col>
                </Row>

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
