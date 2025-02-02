import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import {deleteAssignment, onAddAssignmentTask} from "../../services/assignment.jsx";
import {saveTask} from "../../services/task.jsx";
import 'react-calendar/dist/Calendar.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BASE_API_URL} from "../../utils/api.js";
import axios from "axios";
import uuid from "react-uuid";
import "./index.css"
import "../task/index.css"

export function ModalEditTask (props){
    const {members, data_task, lists, assignments, name_board, token, owner} = props;
    const [nameTask,setNameTask] = useState('');
    const [descriptionTask,setDescriptionTask] = useState('');
    const [list, setList] = useState('');
    const [nameList, setNameList] = useState('')
    const [importance, setImportance] = useState('');
    const [status, setStatus] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [assignment, setAssignments] = useState([])

    useEffect(()=>{
        setNameTask(data_task.name_task);
        setList(data_task.list_id);
        setNameList(data_task.List?.name_list);
        setDescriptionTask(data_task.description);
        setImportance(data_task.importance);
        setStatus(data_task.status);
        setStartDate(data_task.date_start);
        setEndDate(data_task.date_end);
        setAssignments(assignments);
    },[data_task])

    const onSaveTaskState = async () => {
        saveTask(data_task.task_id, nameTask, descriptionTask,
            startDate, endDate,
            list, importance, status, name_board, token)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        setList(null);
        setNameTask(null);
        setDescriptionTask(null);
        setNameTask(null);
        setList(null);
        setNameList(null);
        setEndDate(null);
        setStartDate(null);
        setImportance(null)
        setStatus(null);
        props.onHide();
    };

    const onAddAssignment=(name_board, user_id, task_id, username)=>{
        onAddAssignmentTask(name_board, user_id, task_id, token)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_assignment = {
            user_id:user_id,
            task_id:task_id,
            User:{username:username}
        }
        setAssignments([...assignment, new_assignment]);
    }

    const onDeleteAssignment = (id)=>{
        const newList = assignment.filter(item => item.members_id !== id);
        setAssignments(newList);
    }

    const [data, getFile] = useState({ name: "", path: "" });
    const [file, setFile] = useState('');

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const formData = new FormData();
        const id = uuid();
        console.log();
        formData.append('file', file);
        formData.append('formName', "form-upload-file");
        axios
            .post(`${BASE_API_URL}/board/${name_board}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data; charset=UTF-8',
                    Authorization: `Bearer ${token}`,
                    'task-id':  data_task.task_id,
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // const downloadFile = () =>{
    //
    // }


    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal-window"
        >
            <Modal.Header closeButton>
                <div className="modal-header-task">
                    <Modal.Title id="contained-modal-title-vcenter" >
                        <input type="text" className="name-task-modal" placeholder="Название задачи"
                               defaultValue={data_task.name_task}
                               onChange={(e)=>setNameTask(e.target.value)}/>

                    </Modal.Title>

                    <div className="list">
                        <p className="list-label">в списке: </p>
                        <select className="list-task-label"
                                onChange={(e)=> setList(e.target.value)}
                                defaultValue={data_task.list_id}>
                            {lists.map((list, index)=>(
                                <option value={list.list_id} key={index}
                                        onChange={()=>{
                                            setNameList(list.name_list);
                                            setList(list.list_id);
                                        }}>
                                    {list.name_list}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

            </Modal.Header>
            <Modal.Body>
                <Form className="form-data-task">
                    <Form.Group className="form-task">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" rows={4} className="textarea-task"
                                      defaultValue={data_task.description}
                                      onChange={(e) => setDescriptionTask(e.target.value)}
                        />
                        <hr/>
                        <div className="date-form">
                            <Form.Label>Срок</Form.Label>
                            <DatePicker className="form-input" selected={startDate} locale={'ru'} dateFormat={'DD/MM/YYYY'}
                                        onChange={(date) => setStartDate(date)}/>
                            <DatePicker className="form-input" selected={endDate} locale={'ru'} dateFormat={'DD/MM/YYYY'}
                                        onChange={(date) => setEndDate(date)}/>
                        </div>
                        <hr/>

                        <Form.Group className="form-file-upload">
                            <Form.Label><i className="bi bi-paperclip" aria-hidden="true"></i> Вложения </Form.Label>
                            <Form.Control type="file" className="file-upload" title={"Прикрепить"}
                                onChange={handleChangeFile}
                            />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className="form-data-task2">
                        <Form.Label>Важность</Form.Label>
                        <Form.Select value={importance || ""} className="form-input"
                                     onChange={(e) => setImportance(e.target.value)}
                                     title="Важность">
                            <option value=""></option>
                            <option value="Низкая">Низкая</option>
                            <option value="Средняя">Средняя</option>
                            <option value="Высокая">Высокая</option>
                        </Form.Select>

                        <Dropdown
                            className="list-members-button"
                            size="lg"
                        >
                            <Dropdown.Toggle className="list-members-button">
                                Ответственные
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {assignment.map((item, key) => (
                                    item.task_id === data_task.task_id) && (
                                        <Dropdown.Item key={key}>
                                            <div className="member-info">
                                                {item.User.user_id === owner ?
                                                    <div className="admin-user">
                                                        <p className="name-member">{item.User.username}</p>
                                                        <p className="admin">{item.User.first_name} {item.User.last_name} админ</p>
                                                    </div>
                                                    : <div className="admin-user">
                                                        <p className="name-member">{item.User.username}</p>
                                                        <p className="admin">{item.User.first_name} {item.User.last_name}</p>
                                                    </div>
                                                }
                                                <Button className="members-btn"
                                                    onClick={()=>
                                                        {
                                                            deleteAssignment(item.members_id, name_board, token);
                                                            onDeleteAssignment(item.members_id);
                                                        }}>
                                                    Исключить
                                                </Button>
                                            </div>
                                        </Dropdown.Item>
                                    )
                                )}
                                <Dropdown.Divider></Dropdown.Divider>
                                <p className="label-member">Участники доски</p>
                                {members.map((member) => (
                                    <Dropdown.Item key={member.members_id}>
                                        <div className="member-info">
                                            {member.user_id === owner ?
                                                <div className="admin-user">
                                                    <p className="name-member">{member.User.username}</p>
                                                    <p className="admin">{member.User.first_name} {member.User.last_name} админ</p>
                                                </div>
                                                : <div className="admin-user">
                                                    <p className="name-member">{member.User.username}</p>
                                                    <p className="admin">{member.User.first_name} {member.User.last_name}</p>
                                                  </div>
                                            }
                                            <Button className="members-btn"
                                                    type="button"
                                                    onClick={() => onAddAssignment(name_board, member.User.user_id, data_task.task_id, member.User.username)}>
                                                Добавить
                                            </Button>
                                        </div>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="status">
                            <Form.Check type={'checkbox'} checked={status || false} onChange={() => setStatus(!status)}>
                            </Form.Check>
                            <p className="label-status">{status ? "Выполнено" : "Не выполнено"}</p>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/*<Button onClick={*/}
                {/*    () => {*/}
                {/*        setNameTask(null);*/}
                {/*        setList(null);*/}
                {/*        setNameList(null);*/}
                {/*        setEndDate(null);*/}
                {/*        setStartDate(null);*/}
                {/*        setImportance(null)*/}
                {/*        props.onHide();*/}

                {/*    }}>*/}
                {/*    Close</Button>*/}
                <Button onClick={onSaveTaskState} className="button-save">
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}



