import React, {useEffect, useState} from 'react';
import { renderToString } from 'react-dom/server';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import {addAssignmentTask} from "../scripts/backend/taskManager";
import 'react-calendar/dist/Calendar.css'
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import {ru} from 'date-fns/locale/ru';
registerLocale('ru', ru)
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
moment().format();


//окно
function ModalAddAssignments(props){

}

function addAssignment(user_id, task_id, name_board){
    addAssignmentTask(name_board, user_id, task_id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function ModalCreateTask(props){
    const {members, data_task, lists, assignments, name_board} = props;
    const [nameTask,setNameTask] = useState("")
    const [descriptionTask,setDescriptionTask] = useState(props.data_task.description);
    const [list, setList] = useState(data_task.List?.name_list)
    const [value, onChange] = useState("");
    const [importance, setImportance] = useState("");
    //даты пока null
    console.log(assignments)

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
                <select defaultValue={data_task.List?.name_list}
                        onChange={(e)=>setList(e.target.value)}>
                    {lists.map((list)=>(
                        <option value={list.name_list} key={list.list_id}>{list.name_list}</option>
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
                        <p>Пока без календаря, ничего не получается</p>
                        <p>Срок</p>
                        <Form.Control type="text" placeholder="Название задачи" defaultValue={props.data_task.date_start} onChange={(e)=>setStartDate(e.target.value)}/>
                        <Form.Control type="text" placeholder="Название задачи" defaultValue={props.data_task.date_end} onChange={(e)=>setEndDate(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Select value={importance}
                                     onChange={(e)=>setImportance(e.target.value)}>
                            <option value=""></option>
                            <option value="Низкая">Низкая</option>
                            <option value="Средняя">Средняя</option>
                            <option value="Высокая">Высокая</option>
                        </Form.Select>
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
                                                    type="button" onClick={() => addAssignmentTask(name_board, member.User.user_id, data_task.task_id)}>
                                                <i className="bi bi-plus"></i>
                                            </button>
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
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={
                    ()=> {
                        setNameTask(null);
                        // setEndDate(null);
                        setStartDate(null);
                        setSelectDate(null)
                        props.onHide();

                    }}>
                    Close</Button>
            </Modal.Footer>
        </Modal>
    )

}




