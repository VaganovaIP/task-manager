import React, {useEffect, useRef} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useState} from "react";
import {HeaderMenu, Menu} from "../components/HeaderMenu.jsx";
import Button from "react-bootstrap/Button";
import {createList, fetchDataBoard, createTask} from "../scripts/backend/taskManager.jsx";
import Form from "react-bootstrap/Form";
import uuid from "react-uuid";
import {RenderTaskList} from "../components/Tasks.jsx";
import Card from "react-bootstrap/Card";
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ru} from 'date-fns/locale/ru';
registerLocale('ru', ru)
import {ModalEditTask} from "../modals/task/editTask.jsx"
import {ModalAddMembers} from "../modals/members/membersView.jsx";

export const KanbanBoard = () =>{
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
    const [users, setUsers] = useState([])
    const [onClickCreateList, setOnClickCreateList] = useState(false)
    const [onClickCreateTask, setOnClickCreateTask] = useState(false)
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
    const [modalMembersIsOpen, setModalMembersIsOpen] = useState(false)
    const ref = useRef(null);

    useEffect( () => {
        fetchDataBoard(board_id, name_board, setLists, setTasks, setMembers, setAssignments, setUsers)
            .catch(err => console.log(err));
    }, []);

    const onCreateListCard = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        let list_id = uuid();
        createList(list_id, name_board, name, board_id)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_list = {
            list_id:list_id,
            board_id:board_id,
            name_list:name
        }
        setLists([...lists, new_list])
        setNameList("");
        setOnClickCreateList(false)
        // fetchDataBoard(board_id, name_board, setLists, setTasks, setMembers, setAssignments, setUsers)
        //     .catch(err => console.log(err));
    };

    const onCreateTaskCard = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        let task_id = uuid();
        createTask(task_id, name_board, activeList, board_id, name)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_task = {
            task_id:task_id,
            board_id:board_id,
            list_id:activeList,
            name_task:name
        }
        setTasks([new_task, ...tasks])
        setNameTask("");
        setOnClickCreateTask(false)
    };

    ///
    const openModalEdit = (task) => {
        setModalEditIsOpen(true);
        setActiveTask(task);
    };

    const closeModalEdit = () => {
        setModalEditIsOpen(false);
        fetchDataBoard(board_id, name_board, setLists, setTasks, setMembers, setAssignments, setUsers)
            .catch(err => console.log(err));
    };

    const closeModalMembers = () => {
        setModalMembersIsOpen(false);
        fetchDataBoard(board_id, name_board, setLists, setTasks, setMembers, setAssignments, setUsers)
            .catch(err => console.log(err));
    };

    const handleClickCreateList=()=> {
        setOnClickCreateList(true)
    }
    const handleClickCreateTask=(list_id)=> {
        setOnClickCreateTask(true)
        setActiveList(list_id)
    }

    ///


    const CardCreateList = () =>{
        return(
                <Card border="primary" className="item-board">
                    <Card.Body>
                        <Form onSubmit={onCreateListCard}>
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
                        <Form onSubmit={onCreateTaskCard}>
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
                            className="list-members">
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="list-members" >
                                Участники
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {members.map((member) =>(
                                    <Dropdown.Item key={member.members_id}>
                                        <div className="member-info">
                                            <p className="name-member">{member.User.username}</p>
                                            <Button className="members-btn" type="submit">
                                                Исключить
                                            </Button>
                                        </div>
                                    </Dropdown.Item>
                                ))}
                                <hr/>
                                <Dropdown.Item onClick={()=>setModalMembersIsOpen(true)}>
                                    <div className="add-button-task-members">
                                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                                        <p className="name-member">Добавить участника</p>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="kanban-board">
                        <div className="kanban-columns">
                                {lists.map((list, index) => (
                                        <div key={index}>
                                            <div className="column">
                                                <div className="head-column">{list.name_list}</div>
                                            </div>
                                            <ul className="list-tasks">
                                                {tasks.map((task, index) => (
                                                    list.list_id === task.list_id) &&(
                                                        <li className="task" key={index}  onClick={()=>openModalEdit(task)}>
                                                            <RenderTaskList   task ={task} list={list}></RenderTaskList>
                                                        </li>
                                                    )
                                                )}
                                                {
                                                    onClickCreateTask && list.list_id === activeList ?(
                                                        CardCreateTask()
                                                    ):
                                                        <Button className="add-button-task-members"
                                                                variant="secondary" type="button"
                                                                onClick={() => handleClickCreateTask(list.list_id)}>
                                                            <i className="bi bi-plus"></i>
                                                            <p className="name-member">Добавить задачу</p>
                                                        </Button>
                                                }

                                            </ul>
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
                            <ModalEditTask
                                show={modalEditIsOpen}
                                onHide={closeModalEdit}
                                members={members}
                                data_task={activeTask}
                                lists={lists}
                                assignments={assignments}
                                name_board={name_board}
                            />
                            <ModalAddMembers
                                show={modalMembersIsOpen}
                                onHide={closeModalMembers}
                                members={members}
                                users={users}
                                name_board={name_board}
                                board_id={board_id}
                            />
                            <div>
                                {console.log(users)} {console.log(members)}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}