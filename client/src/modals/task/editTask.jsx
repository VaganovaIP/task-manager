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
import "./index.css"
import "../task/index.css"
import {deleteFile, downloadFile, fetchFilesTask, uploadFile} from "../../services/file.js";
import uuid from "react-uuid";
import convertDate from "../../utils/helpers.jsx";

export function ModalEditTask (props){
    const {members, data_task, lists, assignments, name_board, token, owner, user} = props;
    const [nameTask,setNameTask] = useState('');
    const [descriptionTask,setDescriptionTask] = useState('');
    const [list, setList] = useState('');
    const [nameList, setNameList] = useState('')
    const [importance, setImportance] = useState('');
    const [status, setStatus] = useState(false);
    const [statusEdit, setStatusEdit] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [assignment, setAssignments] = useState([])
    const [filesTask, setFilesTask] = useState([])
    const [history, setHistory] = useState([])

    useEffect(()=>{
        fetchFilesTask(name_board, data_task.task_id, setFilesTask, token, setHistory)
            .then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
        setNameTask(data_task.name_task);
        setList(data_task.list_id);
        setNameList(data_task.List?.name_list);
        setDescriptionTask(data_task.description);
        setImportance(data_task.importance);
        setStatus(data_task.status);
        setStartDate(data_task.date_start);
        setEndDate(data_task.date_end);
        setAssignments(assignments);
        setStatusEdit(false);

    },[data_task])

    const onSaveTaskState = async () => {
        let text_event = status ? `Пользователь ${user.first_name} ${user.last_name} изменил(а) статус задачи  на "Выполнено"`
                : `Пользователь ${user.first_name} ${user.last_name} изменил(а) статус задачи  на "Невыполнено"`;
        if (status !== data_task.status) setStatusEdit(true)
        console.log(statusEdit)
        saveTask(data_task.task_id, nameTask, descriptionTask,
            startDate, endDate,
            list, importance, status, name_board, token, statusEdit, text_event)
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

    const onAddAssignment=(name_board, user_id, task_id, username, first_name, last_name)=>{
        let text_event = `Пользователь ${user.first_name} ${user.last_name} назначил(а) ${first_name} ${last_name} ответственным за выполнение задачи`;
        onAddAssignmentTask(name_board, user_id, task_id, token, text_event)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_assignment = {
            user_id:user_id,
            task_id:task_id,
            User:{username:username,
                first_name:first_name,
                last_name:last_name
            },
        }
        setAssignments([...assignment, new_assignment]);
        const new_event = {
            event_id:uuid(),
            text_event:text_event,
            createdAt:new Date()
        }
        setHistory([new_event, ...history]);
    }

    const onDeleteAssignment = (id)=>{
        const newList = assignment.filter(item => item.members_id !== id);
        setAssignments(newList);
    }

    const [file, setFile] = useState('');

    const onUploadFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
        console.log(file)
        const formData = new FormData();
        let fileId = uuid();
        formData.append('file', file);
        formData.append('formName', "form-upload-file");
        formData.append('task_id', data_task.task_id);
        formData.append('file_name', file.name);
        formData.append('fileId', fileId);
        uploadFile(name_board, formData, data_task.task_id, token);
        const new_file = {
            file_id:fileId,
            task_id:data_task.task_id,
            name_file: file.name,
        }
        setFilesTask([new_file, ...filesTask])
    }

    const onDownloadFile = (fileName) =>{
        downloadFile(name_board, data_task.task_id, fileName, token);
    }

    const onDeleteFile = (id, name)=>{
        deleteFile(name_board, id, data_task.task_id, name, token)
        console.log(id)
        const newList = filesTask.filter(item => item.file_id !== id);
        setFilesTask(newList);
    }

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
                        <Form.Control as="textarea" rows={6} className="textarea-task"
                                      defaultValue={data_task.description}
                                      onChange={(e) => setDescriptionTask(e.target.value)}
                        />
                        <hr/>
                        <div className="date-form">
                            <Form.Label>Срок</Form.Label>
                            <DatePicker className="form-input" selected={startDate} locale={'ru'} dateFormat={'d/MM/YYYY'}
                                        onChange={(date) => setStartDate(date)}/>
                            <DatePicker className="form-input" selected={endDate} locale={'ru'} dateFormat={'d/MM/YYYY'}
                                        onChange={(date) => setEndDate(date)}/>
                        </div>
                        <hr/>
                        <Form.Group className="form-file-upload">
                            <Form.Label><i className="bi bi-paperclip" aria-hidden="true"></i> Вложения </Form.Label>
                            <Form.Control type="file" className="file-upload" title={"Прикрепить"}
                                onChange={onUploadFile}
                            />

                        </Form.Group>
                        <div className="list-files">
                            {filesTask.map((file) =>
                                <div key={file.file_id} className="file-item">
                                    <li className="name-file" onClick={()=>onDownloadFile(file.name_file)}>{file.name_file}</li>
                                    <button onClick={()=>onDeleteFile(file.file_id, file.name_file)} className="button-delete-file">
                                        Удалить
                                    </button>
                                </div>

                            )
                            }
                        </div>
                        <Form.Label>История действий</Form.Label>
                        <div className="list-event-history">
                            {history.map((event) =>
                                <div key={event.event_id}>
                                    <div className="text-event">{event.text_event}</div>
                                    <p className="date-event">{convertDate(event.createdAt)}</p>
                                </div>

                            )
                            }
                        </div>
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
                            <Dropdown.Menu className="dropdown-member">
                                {assignment.map((item, key) => (
                                    item.task_id === data_task.task_id) && (
                                        <Dropdown.Item key={key}>
                                            <div className="member-info">
                                                {item.User.user_id === owner ?
                                                    <div className="admin-user">
                                                        <p className="name-member">{item.User.username}</p>
                                                        <p className="admin">{item.User.first_name} {item.User.last_name}  (админ.)</p>
                                                    </div>
                                                    : <div className="admin-user">
                                                        <p className="name-member">{item.User.username}</p>
                                                        <p className="admin">{item.User.first_name} {item.User.last_name}</p>
                                                    </div>
                                                }
                                                <button className="members-btn-del"
                                                    onClick={()=> {
                                                            let text_event = `Пользователь ${user.first_name} ${user.last_name} снял(а) ${item.User.first_name} ${item.User.last_name} с задачи`;
                                                            deleteAssignment(item.members_id, name_board, token, text_event);
                                                            onDeleteAssignment(item.members_id);
                                                        const new_event = {
                                                            event_id:uuid(),
                                                            text_event:text_event,
                                                            createdAt:new Date()
                                                        }
                                                        setHistory([...history, new_event]);
                                                        }}>
                                                    Исключить
                                                </button>
                                            </div>
                                        </Dropdown.Item>
                                    )
                                )}
                                <Dropdown.Divider></Dropdown.Divider>
                                <p className="label-member">Участники доски</p>
                                {members.map((member) => (
                                    <Dropdown.Item key={member.user_id}>
                                        <div className="member-info">
                                            {member.user_id === owner ?
                                                <div className="admin-user">
                                                    <p className="name-member">{member.User.username}</p>
                                                    <p className="admin">{member.User.first_name} {member.User.last_name}  (админ.)</p>
                                                </div>
                                                : <div className="admin-user">
                                                    <p className="name-member">{member.User.username}</p>
                                                    <p className="admin">{member.User.first_name} {member.User.last_name}</p>
                                                  </div>
                                            }
                                            <button className="members-btn"
                                                    type="button"
                                                    onClick={() => onAddAssignment(name_board, member.User.user_id, data_task.task_id,
                                                        member.User.username, member.User.first_name, member.User.last_name)}>
                                                Добавить
                                            </button>
                                        </div>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="status">
                            <Form.Check type={'checkbox'} checked={status || false} onChange={() => {
                                setStatus(!status);
                            }}>
                            </Form.Check>
                            <p className="label-status">{status ? "Выполнено" : "Невыполнено"}</p>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onSaveTaskState} className="button-save">
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}



