import React,{useContext} from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { TaskContext } from "../App";

function NavbarPage() {
  const [auth,setAuth] = useContext(TaskContext);
  return (
    <>
    {(auth===true)?
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
     <Container fluid>
       <Navbar.Brand href="#">Todo</Navbar.Brand>
       <Navbar.Toggle aria-controls="navbarScroll" />
       <Navbar.Collapse id="navbarScroll">
         <Nav
           className="me-auto my-2 my-lg-0"
           style={{ maxHeight: "100px" }}
           
         >
           {/* <Nav.Link href="/Home">Home</Nav.Link> */}
           <Nav.Link to="#">TodoList</Nav.Link>
          <Nav.Link href="/LogoutComponent">Logout</Nav.Link>
         </Nav>
       </Navbar.Collapse>
     </Container>
   </Navbar>:
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container fluid>
      <Navbar.Brand href="#">Todo</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav 
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
         
        >
          <Nav.Link href="/">Register</Nav.Link>
          <Nav.Link href="/LoginComponent">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>}
     
      
    </>
  );
}

export default NavbarPage;
