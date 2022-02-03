import { Navbar,Container,Nav } from "react-bootstrap";
// import {Link} from 'react-router-dom'
function Header() {
  return <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
    <Container>
    <Navbar.Brand href="/">Covid Icon</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" >
            <Nav.Link href="/"><b>Home</b></Nav.Link>
            <Nav.Link href="/india"><b>Country</b></Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>;
}

export default Header;