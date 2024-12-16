import React, {useEffect, useState} from 'react';
import { renderToString } from 'react-dom/server';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import {onAddAssignmentTask, saveTask} from "../scripts/backend/taskManager";
import 'react-calendar/dist/Calendar.css'
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import {ru} from 'date-fns/locale/ru';
registerLocale('ru', ru)
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import uuid from "react-uuid";
import {createBoard} from "../scripts/backend/boardsActions.jsx";
moment().format();


//окно
function ModalAddAssignments(props){

}




export function ModalCreateTask(props){

    const {members, data_task, lists, assignments, name_board} = props;
    console.log(data_task.task_id + "при модалке")
    const [nameTask,setNameTask] = useState('');
    const [descriptionTask,setDescriptionTask] = useState('');
    const [list, setList] = useState('');
    const [nameList, setNameList] = useState('')
    const [value, onChange] = useState('');
    const [importance, setImportance] = useState('');
    const [status, setStatus] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    //даты пока null

    useEffect(()=>{
        setNameTask(data_task.name_task);
        console.log(nameTask)
        setList(data_task.list_id);
        setNameList(data_task.List?.name_list);
        setDescriptionTask(data_task.description);
        setImportance(data_task.importance);
        setStatus(data_task.status);
        setStartDate(data_task.date_start);
        setEndDate(data_task.date_end);
    },[data_task])


    const onSaveTaskState = async () => {
        console.log(data_task.task_id, nameTask, descriptionTask,
            props.data_task.date_start, props.data_task.date_end,
            list, importance, status, name_board)
        saveTask(data_task.task_id, nameTask, descriptionTask,
            startDate, endDate,
            list, importance, status, name_board)
            .then(r=>console.log(r))
            .catch(err => console.log(err));
        setList(null);
        setNameTask(null);
        setDescriptionTask(null);
    };


    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <input type="text" placeholder="Название задачи" defaultValue={data_task.name_task} onChange={(e)=>setNameTask(e.target.value)}/>
                </Modal.Title>
                <select onChange={(e)=>setList(e.target.value)} defaultValue={data_task.list_id}>
                    {lists.map((list)=>(
                        <option value={list.list_id} key={list.list_id}
                                onChange={()=>{
                                    setNameList(list.name_list);
                                    setList(list.list_id);
                                }}>
                            {list.name_list}
                        </option>
                    ))}
                </select>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" rows={6}
                                      defaultValue={data_task.description}
                                      onChange={(e)=>setDescriptionTask(e.target.value)}
                        />
                        <p>Срок</p>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                        {/*<Form.Control type="text" placeholder="Название задачи" defaultValue={props.data_task.date_start} onChange={(e)=>setStartDate(e.target.value)}/>*/}
                        {/*<Form.Control type="text" placeholder="Название задачи" defaultValue={props.data_task.date_end} onChange={(e)=>setEndDate(e.target.value)}/>*/}
                    </Form.Group>
                    <Form.Group>
                        <Form.Select defaultValue={importance}
                                     onChange={(e)=>setImportance(e.target.value)}>
                            <option value=""></option>
                            <option value="Низкая">Низкая</option>
                            <option value="Средняя">Средняя</option>
                            <option value="Высокая">Высокая</option>
                        </Form.Select>
                        <div>
                            <Form.Check type={'checkbox'} defaultChecked={status} onChange={()=>setStatus(!status)}>
                            </Form.Check>
                            <p>{status ? "Задача выполнена" : "Задача не выполнена" }</p>
                        </div>

                        <Dropdown
                            className="list-members"
                            size="lg"
                        >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="list-members">
                                Ответственные
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {assignments.map((item)=> (
                                    item.task_id === data_task.task_id) &&(
                                    <Dropdown.Item key={item.members_id}>
                                        <div className="member-info">
                                            <p className="name-member">{item.User.username}</p>
                                            <Button className="delete-members-btn" variant="secondary" type="submit">
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </Dropdown.Item>
                                    )
                                )}
                                <Dropdown.Divider></Dropdown.Divider>
                                <p className="name-member">Участники</p>
                                {members.map((member) =>(
                                    <Dropdown.Item key={member.members_id}>
                                        <div className="member-info">
                                            <p className="name-member">{member.User.username}</p>
                                            <button className="add-button-member" variant="secondary"
                                                    type="button" onClick={() => onAddAssignmentTask(name_board, member.User.user_id, data_task.task_id)}>
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={
                    ()=> {
                        // setNameTask(null);
                        // setList(null);
                        // setNameList(null);
                        // setEndDate(null);
                        // setStartDate(null);
                        // setSelectDate(null)
                        props.onHide();

                    }}>
                    Close</Button>
                <Button onClick={onSaveTaskState}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )

}



