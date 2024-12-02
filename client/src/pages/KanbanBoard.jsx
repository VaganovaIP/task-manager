import React, {useEffect, useRef} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useState} from "react";
import {HeaderMenu, Menu} from "../components/HeaderMenu.jsx";
import Button from "react-bootstrap/Button";
import {createList, getDataBoard, createTask} from "../scripts/backend/taskManager.jsx";
import {createBoard, getAllBoards} from "../scripts/backend/boardsActions.jsx";
import Form from "react-bootstrap/Form";
import uuid from "react-uuid";
import {RenderTaskList} from "../components/Tasks.jsx";
import Card from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import * as PropTypes from "prop-types";




function ModalCreateTask(props){
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать задачу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control type="text" placeholder="Название задачи" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" rows={6}/>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

}


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
    const [activeList, setActiveList] = useState("")
    const [tasks, setTasks] = useState([])
    const [members, setMembers] = useState([])

    const [onClickCreateList, setOnClickCreateList] = useState(false)
    const [onClickCreateTask, setOnClickCreateTask] = useState(false)
    const ref = useRef(null);

    useEffect( () => {
        getDataBoard(board_id, name_board, setLists, setTasks, setMembers)
            .catch(err => console.log(err));
    }, []);


    const createListCard = async (event) => {
        event.preventDefault();
        createList(name_board, nameList, board_id)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_list = {
            board_id:board_id,
            name_list:nameList
        }
        setLists([...lists, new_list])
        setNameList("");
        setOnClickCreateList(false)
    };

    const createTaskCard = async (event) => {
        event.preventDefault();
        let task_id = uuid();
        createTask(task_id, name_board, activeList, board_id, nameTask)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_task = {
            task_id:task_id,
            board_id:board_id,
            list_id:activeList,
            name_task:nameTask
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
                                <Form.Control className="form-task-list"
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

    // const CardCreateTask = () =>{
    //     return(
    //         <div className="card-add-task">
    //             <Card border="primary" className="item-board">
    //                 <Card.Body>
    //                     <Form onSubmit={createTaskCard}>
    //                         <Form.Group className="mb-3" >
    //                             <Form.Control className="form-board"
    //                                           type="text" placeholder="" value={nameTask}
    //                                           onChange={(e) => setNameList(e.target.value)
    //                                           }/>
    //                         </Form.Group>
    //                         <Button className="add-button" variant="secondary" type="submit">
    //                             <i className="bi bi-plus"></i>
    //                         </Button>
    //                     </Form>
    //                 </Card.Body>
    //             </Card>
    //         </div>
    //     )
    // }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
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
                                                {tasks.map((task) => (
                                                    list.list_id === task.List.list_id) &&
                                                        <li className="task" key={task.task.task_id}><RenderTaskList task ={task} list={list} ></RenderTaskList></li>

                                                )}

                                                {/*{*/}
                                                {/*    !onClickCreateTask ? (*/}
                                                {/*        <Button className="add-button" variant="secondary" type="button"*/}
                                                {/*                onClick={() => {*/}
                                                {/*                    setActiveList(list.list_id)*/}
                                                {/*                    setOnClickCreateTask(true)*/}
                                                {/*                }}>*/}
                                                {/*            <i className="bi bi-plus"></i>*/}
                                                {/*        </Button>*/}
                                                {/*    ):<CardCreateTask></CardCreateTask>*/}
                                                {/*}*/}
                                            </ul>
                                            <Button className="add-button" variant="secondary" type="button">
                                                <i className="bi bi-plus"></i>
                                            </Button>
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
                            <div>
                                <button onClick={openModal}>Открыть модальное окно</button>
                                <ModalCreateTask
                                    show={modalIsOpen}
                                    onHide={() => setModalIsOpen(false)}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}