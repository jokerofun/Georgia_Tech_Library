import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            className="img-thumbnail img-responsive d-inline-block align-top"
            src="/GeorgiaTech.png"
            alt=""
            width="150"
            height="120"
            title="logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/items" href="/items">
              Items
            </Nav.Link>
            <Nav.Link as={Link} to="/catalog" href="/catalog">
              Catalog
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/borrowingactivity"
              href="/borrowingactivity"
            >
              Borrowing Activity
            </Nav.Link>
            <Nav.Link as={Link} to="/cards" href="/cards">
              Cards
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
