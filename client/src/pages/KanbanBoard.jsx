import React, {useEffect, useRef} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useState} from "react";
import {HeaderMenu, Menu} from "../components/HeaderMenu.jsx";
import Button from "react-bootstrap/Button";
import {createList, fetchDataBoard, createTask} from "../scripts/backend/taskManager.jsx";
import {createBoard, getAllBoards} from "../scripts/backend/boardsActions.jsx";
import Form from "react-bootstrap/Form";
import uuid from "react-uuid";
import {RenderTaskList} from "../components/Tasks.jsx";
import Card from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import * as PropTypes from "prop-types";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import {ru} from 'date-fns/locale/ru';
registerLocale('ru', ru)
import {ModalCreateTask} from "../modals/createTask"

import "react-datepicker/dist/react-datepicker.css";

function DropdownType(props) {
    return null;
}

DropdownType.propTypes = {
    as: PropTypes.any,
    size: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node
};
export const KanbanBoard = () =>{
    const {name} = useParams()
    const location = useLocation()
    const {board_id, name_board} = location.state;
    const [nameList, setNameList] = useState("")
    const [nameTask, setNameTask] = useState("")
    const [lists, setLists] = useState([])
    const [activeList, setActiveList] = useState('')
    const [activeTask, setActiveTask] = useState([])
    const [tasks, setTasks] = useState([])
    const [members, setMembers] = useState([])
    const [assignments, setAssignments] = useState([])
    console.log(assignments)
    const [onClickCreateList, setOnClickCreateList] = useState(false)
    const [onClickCreateTask, setOnClickCreateTask] = useState(false)
    const ref = useRef(null);

    useEffect( () => {
        fetchDataBoard(board_id, name_board, setLists, setTasks, setMembers, setAssignments)
            .catch(err => console.log(err));
    }, []);


    const createListCard = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        createList(name_board, name, board_id)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_list = {
            board_id:board_id,
            name_list:name
        }
        setLists([...lists, new_list])
        setNameList("");
        setOnClickCreateList(false)
    };

    const createTaskCard = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        createTask(name_board, activeList, board_id, name)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_task = {
            board_id:board_id,
            list_id:activeList,
            name_task:name
        }
        setTasks([new_task, ...tasks])
        setNameTask("");
        setOnClickCreateTask(false)
    };

    const CardCreateList = () =>{
        return(
                <Card border="primary" className="item-board">
                    <Card.Body>
                        <Form onSubmit={createListCard}>
                            <Form.Group className="mb-3">
                                <Form.Control className="form-task-list" name="name"
                                              type="text" placeholder="" value={nameList}
                                              onChange={(e) => setNameList(e.target.value)}/>

                            </Form.Group>
                            <Button className="add-button" variant="secondary" type="submit">
                                <i className="bi bi-plus"></i>
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
        )
    }

    const CardCreateTask = () =>{
        return(
            <div className="card-add-task">
                <Card border="primary" className="item-board">
                    <Card.Body>
                        <Form onSubmit={createTaskCard}>
                            <Form.Group className="mb-3" >
                                <Form.Control className="form-board" name="name"
                                              type="text" placeholder="" value={nameTask}
                                              onChange={(e) => setNameTask(e.target.value)
                                              }/>
                            </Form.Group>
                            <Button className="add-button" variant="secondary" type="submit">
                                <i className="bi bi-plus"></i>
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [d, setD] = useState('')
    const openModal = (task) => {
        setModalIsOpen(true);
        setActiveTask(task);
        setD(task.description)
    };

    const closeModal = () => {
        setModalIsOpen(false);
        fetchDataBoard(board_id, name_board, setLists, setTasks, setMembers, setAssignments)
            .catch(err => console.log(err));
    };

    const handleClickCreateList=()=> {
        setOnClickCreateList(true)
    }
    const handleClickCreateTask=(list_id)=> {
        setOnClickCreateTask(true)
        setActiveList(list_id)
    }



    return(
        <div className="f-container">
            <HeaderMenu></HeaderMenu>
            <div className="main">
                <div className="main-menu-content">
                    <Menu></Menu>
                </div>
                <div className="content" >
                    <div className="action-page">
                        <p className="name-page">{name_board}</p>
                        <Dropdown
                            className="list-members"
                            size="lg"
                            >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="list-members">
                                Участники доски
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {members.map((member) =>(
                                    <Dropdown.Item key={member.members_id}>
                                        <div className="member-info">
                                            <p className="name-member">{member.User.username}</p>
                                            <Button className="delete-members-btn" variant="secondary" type="submit">
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </Dropdown.Item>
                                ))}
                                <Dropdown.Divider></Dropdown.Divider>
                                <Dropdown.Item>
                                    <div className="add-button-member">
                                        <i className="bi bi-plus"></i>
                                        <p className="name-member">Добавить участника</p>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="kanban-board">
                        <div className="kanban-columns">
                                {lists.map((list) => (
                                        <div key={list.list_id}>
                                            <div className="column">
                                                <div className="head-column">{list.name_list}</div>
                                            </div>
                                            <ul className="list-tasks">
                                                {tasks.map((task, index) => (
                                                    list.list_id === task.list_id) &&(
                                                        <li className="task" key={index}  onClick={()=>openModal(task)}>
                                                            <RenderTaskList   task ={task} list={list}></RenderTaskList>
                                                        </li>
                                                    )
                                                )}
                                                {
                                                    onClickCreateTask && list.list_id === activeList ?(
                                                        CardCreateTask()
                                                    ):
                                                        <Button className="add-button-task"
                                                                variant="secondary" type="button"
                                                                onClick={() => handleClickCreateTask(list.list_id)}>
                                                            <i className="bi bi-plus"></i>
                                                            <p className="name-member">Добавить задачу</p>
                                                        </Button>
                                                }

                                            </ul>

                                            {/*<Button className="add-button" variant="secondary" type="button" onClick={openModal}>*/}
                                            {/*    <i className="bi bi-plus"></i>*/}
                                            {/*</Button>*/}
                                        </div>

                                    )

                                )
                                }

                            <div className="create-list">
                                <div className="add-list">
                                    {
                                        !onClickCreateList ? (
                                                <Button className="create-list-button" variant="secondary"
                                                        type="button" onClick={handleClickCreateList}>
                                                    <i className="bi bi-plus"></i>Создать новую колонку
                                                </Button>
                                            )
                                            :CardCreateList()
                                    }
                                </div>
                            </div>
                            <ModalCreateTask
                                show={modalIsOpen}
                                onHide={()=>closeModal()}
                                members={members}
                                data_task={activeTask}
                                lists={lists}
                                assignments={assignments}
                                name_board={name_board}
                            />
                            <div>
                                <button onClick={openModal}>Открыть модальное окно</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}