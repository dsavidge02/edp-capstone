import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./css/Shop.css";
import { useCart } from "../contexts/CartContext";
import { Button } from "react-bootstrap";
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

const Shop = () => {
  const [filters, setFilters] = useState({
    low: 0,
    high: 999,
    size: ["small", "medium", "large"],
    style: ["classic", "pirate", "sports", "animal", "food"],
    speed: ["slow", "average", "fast", "mystery"],
    condition: ["new", "used"],
    buoyancy: true,
    inStock: true,
    isFeatured: false,
    onSale: false,
  });

  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, removeFromCart, searchCart } = useCart();

  useEffect(() => {
    filterDucks();
  }, [filters, productName]);

  // Handle event change
  const handleEventChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "low" || name === "high") {
      setFilters({
        ...filters,
        [name]: parseFloat(value) || 0.0,
      });
    } else if (
      ["classic", "pirate", "sports", "animal", "food"].includes(name)
    ) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        style: checked
          ? [...prevFilters.style, name]
          : prevFilters.style.filter((style) => style !== name),
      }));
    } else if (["slow", "average", "fast", "mystery"].includes(name)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        speed: checked
          ? [...prevFilters.speed, name]
          : prevFilters.speed.filter((speed) => speed !== name),
      }));
    } else if (["new", "used"].includes(name)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        condition: checked
          ? [...prevFilters.condition, name]
          : prevFilters.condition.filter((condition) => condition !== name),
      }));
    } else if (["small", "medium", "large"].includes(name)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        size: checked
          ? [...prevFilters.size, name]
          : prevFilters.size.filter((size) => size !== name),
      }));
    } else if (["buoyancy", "inStock", "isFeatured", "onSale"].includes(name)) {
      setFilters({
        ...filters,
        [name]: checked,
      });
    }
  };

  const filterDucks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DUCKS_API_URL}/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...filters,
            productName: productName,
          }),
        }
      );

      if (!response.ok) {
        setProducts([]);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setProducts(data);
      // Handle post submission logic (like showing a success message)
    } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here
    }
  };

  const handleSearchInputChange = (e) => {
    setProductName(e.target.value);
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
        {/* Sidebar for filters */}
        <Col sm={3} className="mb-4">
          <Form>
            <Form.Control
              name="search"
              type="text"
              placeholder="Enter product name..."
              value={productName}
              onChange={handleSearchInputChange}
            />
            <Accordion>
              {/* Filters Accordion */}
              <Accordion.Item eventKey="filters">
                <Accordion.Header>Filters</Accordion.Header>
                <Accordion.Body>
                  {/* Nested Accordion for Duck Details */}
                  <Accordion>
                    <Accordion.Item eventKey="duckDetails">
                      <Accordion.Header>Duck Details</Accordion.Header>
                      <Accordion.Body>
                        {/* Nested Accordion for Price */}
                        <Accordion>
                          <Accordion.Item eventKey="price">
                            <Accordion.Header>Price</Accordion.Header>
                            <Accordion.Body>
                              <Form.Group>
                                <div className="filter">
                                  <span>Low: </span>
                                  <input
                                    type="text"
                                    placeholder="0.00"
                                    label="Low"
                                    id="low"
                                    name="low"
                                    value={filters.low}
                                    onChange={handleEventChange}
                                  />
                                </div>
                                <div className="filter">
                                  <span>High: </span>
                                  <input
                                    type="text"
                                    placeholder="999.99"
                                    label="High"
                                    id="high"
                                    name="high"
                                    value={filters.high}
                                    onChange={handleEventChange}
                                  />
                                </div>
                              </Form.Group>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>

                        {/* Nested Accordion for Size */}
                        <Accordion>
                          <Accordion.Item eventKey="size">
                            <Accordion.Header>Size</Accordion.Header>
                            <Accordion.Body>
                              <Form.Group>
                                <Form.Check
                                  type="checkbox"
                                  label="Small"
                                  id="small"
                                  name="small"
                                  checked={filters.size.includes("small")}
                                  onChange={handleEventChange}
                                />
                                <Form.Check
                                  type="checkbox"
                                  label="Medium"
                                  id="medium"
                                  name="medium"
                                  checked={filters.size.includes("medium")}
                                  onChange={handleEventChange}
                                />
                                <Form.Check
                                  type="checkbox"
                                  label="Large"
                                  id="large"
                                  name="large"
                                  checked={filters.size.includes("large")}
                                  onChange={handleEventChange}
                                />
                              </Form.Group>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>

                        {/* Nested Accordion for Style */}
                        <Accordion>
                          <Accordion.Item eventKey="style">
                            <Accordion.Header>Style</Accordion.Header>
                            <Accordion.Body>
                              <Form.Group>
                                <Form.Check
                                  type="checkbox"
                                  label="Classic"
                                  id="classic"
                                  name="classic"
                                  checked={filters.style.includes("classic")}
                                  onChange={handleEventChange}
                                />
                                <Form.Check
                                  type="checkbox"
                                  label="Pirate"
                                  id="pirate"
                                  name="pirate"
                                  checked={filters.style.includes("pirate")}
                                  onChange={handleEventChange}
                                />
                                <Form.Check
                                  type="checkbox"
                                  label="Sports"
                                  id="sports"
                                  name="sports"
                                  checked={filters.style.includes("sports")}
                                  onChange={handleEventChange}
                                />
                                <Form.Check
                                  type="checkbox"
                                  label="Animal"
                                  id="animal"
                                  name="animal"
                                  checked={filters.style.includes("animal")}
                                  onChange={handleEventChange}
                                />
                                <Form.Check
                                  type="checkbox"
                                  label="Food"
                                  id="food"
                                  name="food"
                                  checked={filters.style.includes("food")}
                                  onChange={handleEventChange}
                                />
                              </Form.Group>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>

                        {/* Nested Accordion for Speed */}
                        <Accordion>
                          <Accordion.Item eventKey="speed">
                            <Accordion.Header>Speed</Accordion.Header>
                            <Accordion.Body>
                              <Form.Group>
                                <Form.Check
                                  type="checkbox"
                                  label="Slow"
                                  id="slow"
                                  name="slow"
                                  checked={filters.speed.includes("slow")}
                                  onChange={handleEventChange}
                                />
                                <Form.Check
                                  type="checkbox"
                                  label="Average"
                                  id="average"
                                  name="average"
                                  checked={filters.speed.includes("average")}
                                  onChange={handleEventChange}
                                />
                                <Form.Check
                                  type="checkbox"
                                  label="Fast"
                                  id="fast"
                                  name="fast"
                                  checked={filters.speed.includes("fast")}
                                  onChange={handleEventChange}
                                />
                                <Form.Check
                                  type="checkbox"
                                  label="Mystery"
                                  id="mystery"
                                  name="mystery"
                                  checked={filters.speed.includes("mystery")}
                                  onChange={handleEventChange}
                                />
                              </Form.Group>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>

                        {/* Nested Accordion for Condition */}
                        <Accordion>
                          <Accordion.Item eventKey="condition">
                            <Accordion.Header>Condition</Accordion.Header>
                            <Accordion.Body>
                              <Form.Group>
                                <Form.Check
                                  type="checkbox"
                                  label="New"
                                  id="new"
                                  name="new"
                                  checked={filters.condition.includes("new")}
                                  onChange={handleEventChange}
                                />
                                <Form.Check
                                  type="checkbox"
                                  label="Used"
                                  id="used"
                                  name="used"
                                  checked={filters.condition.includes("used")}
                                  onChange={handleEventChange}
                                />
                              </Form.Group>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {/* Nested Accordion for Additional Features */}
                  <Accordion>
                    <Accordion.Item eventKey="additionalFeatures">
                      <Accordion.Header>Additional Features</Accordion.Header>
                      <Accordion.Body>
                        <Form.Group>
                          <Form.Check
                            type="checkbox"
                            label="Buoyant"
                            id="buoyancy"
                            name="buoyancy"
                            checked={filters.buoyancy}
                            onChange={handleEventChange}
                          />
                          <Form.Check
                            type="checkbox"
                            label="In Stock"
                            id="inStock"
                            name="inStock"
                            checked={filters.inStock}
                            onChange={handleEventChange}
                          />
                          <Form.Check
                            type="checkbox"
                            label="Featured"
                            id="isFeatured"
                            name="isFeatured"
                            checked={filters.isFeatured}
                            onChange={handleEventChange}
                          />
                          <Form.Check
                            type="checkbox"
                            label="Discount"
                            id="onSale"
                            name="onSale"
                            checked={filters.onSale}
                            onChange={handleEventChange}
                          />
                        </Form.Group>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Form>
        </Col>
        {/* Main content area for products */}
        <Col sm={9}>
          {products.length === 0 ? (
            <p>No ducks found with the specified criteria.</p>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={4} className="mb-4">
                  <Card className="duck-card">
                    <img
                      src={
                        styleToImage[product.duckDetails.style] || ClassicImg
                      }
                      alt={product.duckDetails.style}
                      className="duck-icon"
                    />
                    <Card.Body>
                      <Card.Title>{product.productName}</Card.Title>
                      <Card.Text>Price: {product.duckDetails.price}</Card.Text>
                      <Card.Text>Size: {product.duckDetails.size}</Card.Text>
                      <Card.Text>Style: {product.duckDetails.style}</Card.Text>
                      <Card.Text>Speed: {product.duckDetails.speed}</Card.Text>
                      <Card.Text>
                        Condition: {product.duckDetails.condition}
                      </Card.Text>
                      <Card.Text>
                        Buoyancy:{" "}
                        {product.additionalFeatures.buoyancy ? "True" : "False"}
                      </Card.Text>
                      <Card.Text>
                        In Stock:{" "}
                        {product.additionalFeatures.inStock ? "True" : "False"}
                      </Card.Text>
                      <Card.Text>
                        Is Featured:{" "}
                        {product.additionalFeatures.isFeatured
                          ? "True"
                          : "False"}
                      </Card.Text>
                      <Card.Text>
                        On Sale:{" "}
                        {product.additionalFeatures.onSale ? "True" : "False"}
                      </Card.Text>
                      <Button onClick={() => handleCartButton(product)}>
                        {searchCart(product)
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
