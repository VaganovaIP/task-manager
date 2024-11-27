import React, {useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {HeaderMenu, Menu} from "../components/HeaderMenu.jsx";
import {CDBBtn} from "cdbreact";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {getAllTasks} from "../scripts/backend/taskManager.jsx";
import {getAllBoards} from "../scripts/backend/boardsActions.jsx";


export const renderTaskList = (task, list) =>{
    return (
                <li className="task">
                    <Card className="task-card">
                        <Card.Body>
                            <Card.Title className="name-task">
                                {task.name_task}
                                {/*<Link to={`/board/${item.name_board}`} state = {{id:item.board_id}}>{item.name_board}</Link>*/}
                            </Card.Title>
                            <Card.Text className="date-task">
                                {/*{task.date_start} - {task.date_end}*/}
                            </Card.Text>
                        </Card.Body>
                        <div className="delete-task">
                            <Button className="delete-task-btn" variant="secondary" type="submit">
                                <i className="bi bi-trash"></i>
                            </Button>
                        </div>

                    </Card>
                </li>
    )

}

export const KanbanBoard = (props) =>{
    const {name} = useParams()
    const location = useLocation()
    const {id, name_board} = location.state;
    const [nameList, setNameList] = useState("")
    const [lists, setLists] = useState([])
    const [tasks, setTasks] = useState([])

    useEffect( () => {
        getAllTasks(id, name_board, setLists, setTasks)
            .catch(err => console.log(err));
    }, []);

    return(
        <div className="f-container">
            <HeaderMenu></HeaderMenu>
            <div className="main">
                <div className="main-menu-content">
                    <Menu></Menu>
                </div>
                <div className="content">
                    <div className="kanban-board">
                        <div>
                            <button color="light">
                                Добавить колонку
                            </button>
                        </div>
                        <div className="kanban-columns">
                                {lists.map((list,index) => (
                                        <div>
                                            <div className="column">
                                                <div className="head-column" key={index}>{list.name_list}</div>
                                            </div>
                                            <ul className="list-tasks" key={list.list_id}>
                                                {tasks.map((task) => (
                                                        list.list_id === task.List.list_id) &&
                                                    renderTaskList(task, list)
                                                )}
                                            </ul>
                                            <Button className="add-button" variant="secondary" type="submit">
                                                <i className="bi bi-plus"></i>
                                            </Button>
                                        </div>
                                    )
                                )}
                            {/*{lists.map((list) => (*/}
                            {/*<ul key={list.list_id}>*/}

                            {/*            <div className="column">*/}
                            {/*                <li className="head-column" key={list.list_id}>{list.name_list}</li>*/}
                            {/*
                            {/*            </div>*/}

                            {/*</ul>      )*/}

                            {/*    )}*/}
                        </div>

                    </div>
                </div>
            </div>
        </div>
        // <div>
        //
        //     <h1>Board {id} </h1>
        //     <form  >
        //         <input type="text"
        //                value={nameList}
        //                placeholder=""
        //                onChange={(e) => setNameList(e.target.value)}
        //         />
        //         <button type="submit">Добавить колонку</button>
        //     </form>



        // </div>
    )
}