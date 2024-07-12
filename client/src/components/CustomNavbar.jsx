import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

import { useFormContext } from "../contexts/FormContext";
import whackyDucksLogo from "../assets/img/whacky-ducks-logo-transparent.png";
import shopping_cart_icon from "../assets/icons/shopping-cart-11.svg";
import "./css/CustomNavbar.css";

const CustomNavbar = () => {
  const { switchToLogin, switchToRegister } = useFormContext();

  return (
    <Navbar
      className="bg-body-tertiary custom-navbar"
      bg="light"
      data-bs-theme="light"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/featured"
          className="d-flex align-items-center ms-4"
        >
          <img
            alt="Mind Melee Logo"
            src={whackyDucksLogo}
            className="d-inline-block align-top"
            id="navbar-logo-image"
          />{" "}
          <span className="ms-2 navbar-clickable" id="navbar-logo-text">
            WHACKY DUCKS
          </span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="mobile-menu"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="bg-light">
          <Nav className="ms-auto me-4">
            <NavDropdown
              title="SHOP"
              className="navbar-clickable navbar-link"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                className="navbar-clickable navbar-sublink"
                as={Link}
                to="/featured"
              >
                FEATURED
              </NavDropdown.Item>
              <NavDropdown.Item
                className="navbar-clickable navbar-sublink"
                as={Link}
                to="/recommended"
              >
                RECOMMENDED
              </NavDropdown.Item>
              <NavDropdown.Item
                className="navbar-clickable navbar-sublink"
                as={Link}
                to="/shop"
              >
                ALL DUCKS
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              className="navbar-clickable navbar-link"
              as={Link}
              to="/login-register"
              onClick={switchToRegister}
            >
              REGISTER
            </Nav.Link>
            <Nav.Link
              className="navbar-clickable navbar-link"
              as={Link}
              to="/login-register"
              onClick={switchToLogin}
            >
              LOGIN
            </Nav.Link>
            <Nav.Link
              className="navbar-clickable navbar-link"
              id="navbar-shopping-cart"
              as={Link}
              to="/checkout"
              onClick={switchToLogin}
            >
              VIEW CART
              <img alt="" src={shopping_cart_icon} id="navbar-shopping-image" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
