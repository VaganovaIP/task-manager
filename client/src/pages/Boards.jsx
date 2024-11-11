import {useEffect, useState} from "react";
import {getBoards} from "../scripts/backend/boards.jsx";
import {addBoard} from "../scripts/backend/boards.jsx";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/list-boards.css'
import '../styles/header-menu.css'
import '../styles/index.css'
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, redirect, useNavigate} from "react-router-dom";
import {header} from '../components/header.jsx'
import uuid from 'react-uuid';

const client = axios.create({
    baseURL: "http://localhost:5000/boards"
});

function Boards() {
    const [boards, setBoards] = useState([]);
    const [name, setName] = useState("")
    const navigate = useNavigate();

    useEffect( () => {
        axios
            .get('http://localhost:5000/boards')
            .then(data => {
                setBoards(data.data);
            })
    }, []);


    const renderListBoards = (item) => {
        return(
            <Card key={item.board_id} className="item-board" >
                <Card.Body>
                    <Card.Title>
                        <Card.Link  href={`/board/${item.board_id}`}>{item.name_board}</Card.Link>
                    </Card.Title>
                </Card.Body>
            </Card>
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let board_id = uuid();
        addBoard(name, board_id);
        const new_board = {
            board_id:board_id,
            name_board:name
        }
        setBoards([new_board, ...boards])
        setName("");
        //navigate(`/board/${board_id}` , { replace: false })

    };

    const addCardBoard=()=>{
       return(
           <Card border="primary" className="item-board">
               <Card.Body>
                   <Form onSubmit={handleSubmit}>
                       <Form.Group className="mb-3" controlId="formBasicEmail">
                           <Form.Control
                               type="text" placeholder="" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                       </Form.Group>
                       <Button variant="primary" type="submit">Добавить</Button>
                   </Form>
               </Card.Body>
           </Card>
       )
    }


    const menu=()=>{
        return(
           <nav className="menu">
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
        <div className="main">
            {header()}
            <section className="main-content">
                <div className="main-menu">
                    {menu()}
                </div>
                <div className="boards">
                    <ul className="list-boards">
                        {addCardBoard()}
                        {boards.map((item) => (
                            <li key={item.board_id}>{renderListBoards(item)}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default Boards