import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./css/CustomFooter.css";

const CustomFooter = () => {
  return (
    <footer className="bg-light text-dark py-3 custom-footer">
      <Container fluid>
        <Row>
          <Col xs={4}>
            <h5 className="footer-header">ABOUT US</h5>
            <p className="footer-par">BLAH BLAH BLAH</p>
          </Col>
          <Col xs={4}>
            <h5 className="footer-header">CONTACT US</h5>
            <p className="footer-par">BLAH BLAH BLAH</p>
          </Col>
          <Col xs={4}>
            <h5 className="footer-header">FOLLOW US</h5>
            <p className="footer-par">BLAH BLAH BLAH</p>
          </Col>
        </Row>
        <Row className="mt-0">
          <Col>
            <p className="text-center footer-par">
              &copy; 2024 MIND MELEE. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default CustomFooter;
