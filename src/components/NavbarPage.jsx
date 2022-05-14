import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegisterComponent from "./RegisterComponent";
import LoginComponent from "./LoginComponent";
import TodoList from "./TodoList";
import LogoutComponent from "./LogoutComponent";

function NavbarPage() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/RegisterComponent">Register</Nav.Link>
             {localStorage.getItem("token")===null?<Nav.Link href="/LoginComponent">Login</Nav.Link>:<Nav.Link href="/LogoutComponent">Logout</Nav.Link>} 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/RegisterComponent" element={<RegisterComponent />} />
          <Route path="/LoginComponent" element={<LoginComponent />} />
          <Route path="/TodoList" element={<TodoList />} />
          <Route path="/LogoutComponent" element={<LogoutComponent />} />
        </Routes>
      </Router>
    </>
  );
}

export default NavbarPage;
