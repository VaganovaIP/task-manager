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
    const [user, setUser] = useState([]);
    const [searchResults, setSearchResults] = useState(boards);
    const options = {keys:["name_board", "Board.name_board"]};
    const fuse = new Fuse(boards, options);
    const [onSearch, setOnSearch] = useState(false);
    const [onClickCreateBoard, setOnClickCreateBoard] = useState(false)

    useEffect( () => {
        const fetchData = async () =>{
            fetchAllBoards(setBoards, token, email, setUser).then((r)=>console.log(r));
        }
        fetchData();
    }, [email]);


    const handleSubmitCardBoard = async (event) => {
        event.preventDefault();
        let board_id = uuid();
        let name_board = name !== "" ? name : "Новая доска"
        createBoard(name_board, board_id, email, token)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_board = {
            Board:{
                board_id:board_id,
                name_board:name_board
            }
        }
        setBoards([new_board, ...boards])
        setName("");
        setOnClickCreateBoard(false);
    };


    const handleClickCreateBoard=()=> {
        setOnClickCreateBoard(true)
    }
    const handleClickCloseCreateBoard=()=> {
        setOnClickCreateBoard(false)
        setName('');
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
    const renderListBoards = (item) => {
        return(
            <div>
                <Card key={item.board_id} >
                    <Card.Body className="item-board">
                        <Link to={`/board/${item.Board?.name_board}`}
                              state = {{board_id:item.Board?.board_id, name_board:item.Board?.name_board}}>
                            <Card.Title className="card-name-board">
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
    const addCardBoard=(name, setName)=>{
        return(
            <Card border="primary" className="item-board-add">
                <Card.Body>
                    <Form onSubmit={handleSubmitCardBoard}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control className="form-board"
                                          type="text" placeholder="" value={name }
                                          onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        <div className="card-create">
                            <Button className="add-button" variant="secondary" type="submit">
                                Добавить доску
                            </Button>
                            <button className="button-close" onClick={handleClickCloseCreateBoard}>
                                <i className="bi bi-x-lg"></i></button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        )
    }

    return (
        <div className="f-container">
                <HeaderMenu userInfo={user}></HeaderMenu>
            <div className="main">
                <div className="main-menu-content">
                    <Menu></Menu>
                </div>
                <div className="content">
                    <div className="action-page">
                        <div className="board-action">
                            <div>Доски</div>
                            <button className="button-close" title="Добавить доску" onClick={handleClickCreateBoard}>
                                <i className="bi bi-plus"></i>Добавить доску</button>
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
                        {onClickCreateBoard && addCardBoard(name, setName)}
                        {
                            onSearch ? (
                                searchResults.map((board) =>
                                    <div key={board.board_id}>
                                        <li >
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
                                boards.map((board) => (
                                        <li key={board.board_id}>
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
