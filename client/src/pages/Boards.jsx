import React from 'react';
import {useEffect, useState} from "react";
import {createBoard, fetchAllBoards} from "../scripts/backend/boardsManager.jsx";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {HeaderMenu, Menu} from '../components/HeaderMenu.jsx'
import uuid from 'react-uuid';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Fuse from "fuse.js";


export default function Boards() {
    const [boards, setBoards] = useState([]);
    const [searchBoards, setSearchBoards] = useState("");
    const [name, setName] = useState("")
    const [searchName, setSearchName] = useState("");
    const [searchResults, setSearchResults] = useState(boards);
    const options = {keys:["name_board"]};
    const fuse = new Fuse(boards, options);

    const navigate = useNavigate();
    const location = useLocation();
    const [onSearch, setOnSearch] = useState(false);


    useEffect( () => {
        fetchAllBoards(boards, setBoards)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, []);

    const renderListBoards = (item) => {
        const Redirect = <Navigate to="/board" replace={false} state={{id: 'board_id'}} />
        return(
            <Card key={item.board_id} className="item-board">
                <Card.Body>
                    <Card.Title>
                        <Link to={`/board/${item.name_board}`} state = {{board_id:item.board_id, name_board:item.name_board}}>{item.name_board}</Link>
                    </Card.Title>
                </Card.Body>
            </Card>
        )
    }

    const handleSubmitCardTask = async (event) => {
        event.preventDefault();
        let board_id = uuid();
        const email = "user1@.ru";
        createBoard(name, board_id, email)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_board = {
            board_id:board_id,
            name_board:name
        }
        setBoards([new_board, ...boards])
        setName("");
        //navigate(`/board/${name}`,{replace: false, state: {id: board_id}})

    };

    const addCardBoard=(name, setName)=>{
       return(
           <Card border="primary" className="item-board">
               <Card.Body>
                   <Form onSubmit={handleSubmitCardTask}>
                       <Form.Group className="mb-3" controlId="formBasicEmail">
                           <Form.Control className="form-board"
                               type="text" placeholder="" value={name}
                               onChange={(e) => setName(e.target.value)}/>

                       </Form.Group>
                       <Button className="add-button" variant="secondary" type="submit">
                           <i className="bi bi-plus"></i>
                       </Button>
                   </Form>
               </Card.Body>
           </Card>
       )
    }

    const onChangeBoardSearch= (event) =>{
        const {value} = event.target;
        if (value.length === 0){
            setSearchResults(boards);
            setOnSearch(false);
            return;
        }
        const results = fuse.search(value);
        const items = results.map((result) => result.item);
        setSearchResults(items);
        setOnSearch(true)
    }

    return (
        <div className="f-container">
                <HeaderMenu></HeaderMenu>
            <div className="main">
                <div className="main-menu-content">
                    <Menu></Menu>
                </div>
                <div className="content">
                    <div className="action-page">
                        <div className="name-page">Доски
                        </div>
                        <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Поиск"
                            className="me-2"
                            aria-label="Search"
                            onChange={onChangeBoardSearch}
                        />
                    </Form>
                    </div>

                    <ul className="list-boards">
                        {addCardBoard(name, setName)}
                        {
                            onSearch ? (
                                searchResults.map((board) =>
                                        <li key={board.board_id}>
                                            {renderListBoards(board)}
                                        </li>
                                    )

                            ) : (
                                boards.map((item) => (
                                    <li key={item.board_id}>
                                        {renderListBoards(item)}
                                    </li>
                                ))
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
