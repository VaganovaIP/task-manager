import React, {useEffect, useState} from 'react';
import { renderToString } from 'react-dom/server';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import 'react-calendar/dist/Calendar.css'
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import {ru} from 'date-fns/locale/ru';
registerLocale('ru', ru)
import "react-datepicker/dist/react-datepicker.css";

export function ModalCreateTask(props){
    const {members, data_task} = props;
    const name = data_task.name_task
    const [nameTask,setNameTask] = useState("")
    const [descriptionTask,setDescriptionTask] = useState("")
    const [value, onChange] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    console.log(name)
    console.log("task " + nameTask)

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать задачу
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Control type="text" placeholder="Название задачи" defaultValue={data_task.name_task} onChange={(e)=>setNameTask(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" rows={6} defaultValue={data_task.description}
                                      value={descriptionTask}
                                      onChange={(e)=>setDescriptionTask(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div>
                            <p>Срок</p>
                            <p>Срок</p>
                            {console.log(data_task)}
                            <DatePicker locale="ru" format='yyyy-MM-dd' defaultValue={data_task.date_start}
                                        selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div>
                            {console.log(data_task.date_end)}
                            <DatePicker locale="ru" format='yyyy-MM-dd' defaultValue={data_task.date_end} selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                        <Form.Select>
                            <option>Важность</option>
                            <option value="1">Срочно</option>
                            <option value="2">Срочно</option>
                            <option value="3">Срочно</option>
                        </Form.Select>
                        <Dropdown
                            className="list-members"
                            size="lg"
                        >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="list-members">
                                Участники
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
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={
                    ()=> {
                        setNameTask(null);
                        setEndDate(null);
                        setStartDate(null);
                        setDescriptionTask(null);
                        props.onHide();
                        setDescriptionTask(null);
                    }}>
                    Close</Button>
            </Modal.Footer>
        </Modal>
    )

}




