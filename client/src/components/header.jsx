import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export const header=()=>{
    return(
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">Taskania</Navbar.Brand>
                {/*<Nav className="me-auto">*/}
                {/*    <Nav.Link href="#home">Home</Nav.Link>*/}
                {/*    <Nav.Link href="#features">Features</Nav.Link>*/}
                {/*    <Nav.Link href="#pricing">Pricing</Nav.Link>*/}
                {/*</Nav>*/}
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Поиск"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success" className="search-header">Найти</Button>
                </Form>
            </Container>
        </Navbar>
    )
}