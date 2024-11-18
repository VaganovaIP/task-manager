import {useEffect, useState} from "react";
import {getBoards} from "../scripts/backend/boards.jsx";
import {addBoard} from "../scripts/backend/boards.jsx";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {HeaderMenu, Menu} from '../components/HeaderMenu.jsx'
import uuid from 'react-uuid';
import 'bootstrap-icons/font/bootstrap-icons.css';

const client = axios.create({
    baseURL: "http://localhost:5000/boards"
});


function Boards() {
    const [boards, setBoards] = useState([]);
    const [searchBoards, setSearchBoards] = useState([]);
    const [name, setName] = useState("")

    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {
        getBoards(boards, setBoards)
    }, []);


    const renderListBoards = (item) => {
        const Redirect = <Navigate to="/board" replace={false} state={{id: 'board_id'}} />
        return(
            <Card key={item.board_id} className="item-board">
                <Card.Body>
                    <Card.Title>
                        <Link to={`/board/${item.name_board}`} state = {{id:item.board_id}}>{item.name_board}</Link>
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
        //navigate(`/board/${name}`,{replace: false, state: {id: board_id}})

    };

    const addCardBoard=()=>{
       return(
           <Card border="primary" className="item-board">
               <Card.Body>
                   <Form onSubmit={handleSubmit}>
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


    return (
        <div className="f-container">
                <HeaderMenu></HeaderMenu>
            <div className="main">
                <div>
                    <Menu></Menu>
                </div>
                <div className="content">
                    <div className="name-page">Доски</div>
                    <ul className="list-boards">

                        {addCardBoard()}

                        {boards.map((item) => (
                            <li key={item.board_id}>
                                {renderListBoards(item)}</li>
                        ))}
                    </ul>
                    </div>
            </div>
        </div>

    )
}

export default Boards