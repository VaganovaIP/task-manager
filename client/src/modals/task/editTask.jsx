import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import {CDBIcon} from "cdbreact";
import {onAddAssignmentTask, saveTask} from "../../scripts/backend/taskManager.jsx";
import 'react-calendar/dist/Calendar.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"

export function ModalEditTask(props){
    const {members, data_task, lists, assignments, name_board} = props;
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
            list, importance, status, name_board)
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
        onAddAssignmentTask(name_board, user_id, task_id)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        const new_assignment = {
            user_id:user_id,
            task_id:task_id,
            User:{username:username}
        }
        return setAssignments([...assignment, new_assignment]);
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
                            <DatePicker className="form-input" selected={startDate} locale={'ru'}
                                        onChange={(date) => setStartDate(date)}/>
                            <DatePicker className="form-input" selected={endDate} locale={'ru'}
                                        onChange={(date) => setEndDate(date)}/>
                        </div>
                        <hr/>
                        <Form.Label>Вложения</Form.Label>
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
                                                <p className="name-member">{item.User.username}</p>
                                                <Button className="members-btn" type="submit">
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
                                            <p className="name-member">{member.User.username}</p>
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
                        <Form.Group className="form-file-upload">
                            <i className="fa fa-paperclip" aria-hidden="true"></i>
                            <Form.Control type="file" className="file-upload" title="Прикрепить файл"/>
                        </Form.Group>
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



