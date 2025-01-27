import React from 'react';
import {useEffect, useState} from "react";
import {createBoard, deleteBoard, fetchAllBoards} from "../../services/board.jsx";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import {HeaderMenu, Menu} from '../../components/HeaderMenu.jsx'
import uuid from 'react-uuid';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Fuse from "fuse.js";
import "./listBoards.css"



export default function ListBoards({token, email}) {
    const [boards, setBoards] = useState([]);
    const [name, setName] = useState("")
    const [searchResults, setSearchResults] = useState(boards);
    const options = {keys:["name_board", "Board.name_board"]};
    const fuse = new Fuse(boards, options);
    const [onSearch, setOnSearch] = useState(false);


    useEffect( () => {
        fetchAllBoards(setBoards, token, email);
    }, []);

    const renderListBoards = (item) => {
        return(
            <div>
                    <Card key={item.board_id} >
                        <Card.Body className="item-board">
                            <Link to={`/board/${item.Board?.name_board}`}
                                  state = {{board_id:item.Board?.board_id, name_board:item.Board?.name_board}}>
                                <Card.Title>
                                    {item.Board?.name_board}
                                </Card.Title>
                            </Link>
                        </Card.Body>
                        <div className="delete-board">
                            <Button className="delete-board-btn" variant="secondary"
                                onClick={()=>
                                {
                                    deleteBoard(item.Board?.board_id, token);
                                    onDeleteBoard(item.Board?.board_id);
                                }}>
                                <i className="bi bi-trash"></i> Удалить доску
                            </Button>
                        </div>
                    </Card>
            </div>
        )
    }

    const handleSubmitCardTask = async (event) => {
        event.preventDefault();
        let board_id = uuid();
        createBoard(name, board_id, email, token)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_board = {

            Board:{
                board_id:board_id,
                name_board:name
            }
        }
        setBoards([new_board, ...boards])
        setName("");

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

    const onDeleteBoard = (id)=>{
        const newList = boards.filter(item => item.Board?.board_id !== id);
        setBoards(newList);
    }
    console.log(boards)
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
                                searchResults.map((board, index) =>
                                    <div>
                                        <li key={index}>
                                            {renderListBoards(board)}
                                        </li>
                                        <div className="delete-board">
                                            <Button className="delete-board-btn" variant="secondary" type="submit"
                                                onClick={()=>
                                                    {
                                                        deleteBoard(board.Board?.board_id, token);
                                                        onDeleteBoard(board.Board?.board_id);
                                                    }}>
                                                <i className="bi bi-trash"></i> Удалить доску
                                            </Button>
                                        </div>
                                    </div>
                                    )
                            ) : (
                                boards.map((board, index) => (
                                        <li key={index}>
                                            {renderListBoards(board)}
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
