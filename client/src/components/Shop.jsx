import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./css/Shop.css";

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

  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$10",
      size: "Small",
      style: "Casual",
      buoyancy: true,
      inStock: true,
      isFeatured: false,
      onSale: true,
      speed: "Slow",
      condition: "New",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$20",
      size: "Medium",
      style: "Formal",
      buoyancy: false,
      inStock: true,
      isFeatured: true,
      onSale: false,
      speed: "Medium",
      condition: "Used",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$15",
      size: "Large",
      style: "Casual",
      buoyancy: true,
      inStock: false,
      isFeatured: false,
      onSale: true,
      speed: "Fast",
      condition: "New",
    },
    {
      id: 4,
      name: "Product 4",
      price: "$25",
      size: "Medium",
      style: "Casual",
      buoyancy: false,
      inStock: true,
      isFeatured: true,
      onSale: true,
      speed: "Medium",
      condition: "Used",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$18",
      size: "Small",
      style: "Formal",
      buoyancy: true,
      inStock: true,
      isFeatured: false,
      onSale: false,
      speed: "Fast",
      condition: "New",
    },
  ];

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

    filterDucks();
  };

  const filterDucks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DUCKS_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Handle post submission logic (like showing a success message)
    } catch (error) {
      console.error("Error posting data", error);
      // Handle errors here
    }
  };

  return (
    <Container fluid className="shop-container">
      <Row>
        {/* Sidebar for filters */}
        <Col sm={3} className="mb-4">
          <Form>
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
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: {product.price}</Card.Text>
                    <Card.Text>Size: {product.size}</Card.Text>
                    <Card.Text>Style: {product.style}</Card.Text>
                    <Card.Text>
                      Buoyancy: {product.buoyancy ? "True" : "False"}
                    </Card.Text>
                    <Card.Text>
                      In Stock: {product.inStock ? "True" : "False"}
                    </Card.Text>
                    <Card.Text>
                      Is Featured: {product.isFeatured ? "True" : "False"}
                    </Card.Text>
                    <Card.Text>
                      On Sale: {product.onSale ? "True" : "False"}
                    </Card.Text>
                    <Card.Text>Speed: {product.speed}</Card.Text>
                    <Card.Text>Condition: {product.condition}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
