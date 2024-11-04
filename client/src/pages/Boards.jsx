import {useEffect, useState} from "react";
import {getBoards} from "../scripts/backend/boards.jsx";
import {addBoard} from "../scripts/backend/boards.jsx";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/list-boards.css'
import '../styles/index.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Boards() {

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        getBoards(boards, setBoards).then(r => console.log(r));
    }, []);

    const renderListBoards = (item, key) => {
        return(
            <Card key={key} className="item-board" >
                <Card.Body>
                    <Card.Title>
                        <Card.Link  href='/:{item.name_board}' >{item.name_board}</Card.Link>
                    </Card.Title>
                </Card.Body>
            </Card>
        )
    }


    const addCardBoard=()=>{
       return(
           <Card border="primary" className="item-board">
               <Card.Body>
                   <Form onSubmit={addBoard}>
                       <Form.Group className="mb-3" controlId="formBasicEmail">
                           <Form.Control type="text" placeholder="" />
                       </Form.Group>
                       <Button variant="primary" type="submit">Добавить</Button>
                   </Form>
               </Card.Body>
           </Card>
       )
    }


    const header=()=>{
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

    const menu=()=>{
        return(
           <nav className="main-menu">
               <ul className="menu-list">
                   <h1 className="my-case">Мои доски</h1>
                   <li>
                       <a href="#" className="menu-item">Список досок</a>
                   </li>
                   <li>
                       <a href="#" className="menu-item">Список задач</a>
                   </li>
                   <h1 className="my-case">Чаты</h1>
                   <li>
                       <a href="#" className="menu-item">Список чатов</a>
                   </li>
                   <h1 className="my-case">События</h1>
                   <li>
                       <a href="#" className="menu-item">Календарь событий</a>
                   </li>
               </ul>
           </nav>

        )
    }

    return (
        <div >
            {header()}
            <div className="main-content">
                <div className="flex-shrink-1">
                    {menu()}
                </div>
                <div className="p-2 w-100">
                    <ul className="list-boards">
                        {addCardBoard()}
                        {boards.map((board, id) =>{
                            return renderListBoards(board, id)
                        } )}
                    </ul>
                    Flex item
                </div>
            </div>
            <footer className="footer">
            </footer>
        </div>
    )
}
const header = ()=>{

}

export default Boards