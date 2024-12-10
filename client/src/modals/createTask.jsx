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
import moment from 'moment';
moment().format();


export function ModalCreateTask(props){
    const {members, data_task} = props;
    const name = data_task.name_task;
    const start = props.data_task.date_start;
    const end = props.data_task.date_end;
    {console.log(props.data_task.date_start + "111")}
    {console.log(props.data_task.date_end + "222")}
    const [nameTask,setNameTask] = useState("")
    const [descriptionTask,setDescriptionTask] = useState(props.data_task.description)
    const [value, onChange] = useState("");
    let fstart;
    if(start === null) {
        fstart = moment(new Date()).format("YYYY/MM/DD");
    }else {
        fstart = moment(start, "YYYY-MM-DD").format("YYYY/MM/DD");
    }
    const [selectDate, setSelectDate] = useState(new Date(fstart))
    const fstart1 = moment(start, "YYYY-MM-DD").format("YYYY/MM/DD");
    const [startDate, setStartDate] = useState(props.data_task.date_start);
    const [endDate, setEndDate] = useState(props.data_task.date_end);

    const selectedDate = moment(start).toDate();



    const handleTextChange=(event)=>{
        setDescriptionTask(event.target.value)
    }
    // const [startDate, setStartDate] = useState(new Date());

    const [dateText, setDateText] = useState('')
    const [startDate1, setStartDate1] = useState(new Date());

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
                        <Form.Control as="textarea" rows={6}
                                      defaultValue={data_task.description}
                                      onChange={handleTextChange}
                        />
                        <p>Пока без календаря, ничего не получается</p>
                        <p>Срок</p>
                        <Form.Control type="text" placeholder="Название задачи" defaultValue={props.data_task.date_start} onChange={(e)=>setStartDate(e.target.value)}/>
                        <Form.Control type="text" placeholder="Название задачи" defaultValue={props.data_task.date_end} onChange={(e)=>setEndDate(e.target.value)}/>

                    </Form.Group>
                    <Form.Group>
                        <div>


                            {/*<DatePicker locale="ru" format='yyyy-MM-dd' defaultValue={data_task.date_start}*/}
                            {/*            selected={startDate} onChange={(date) => setStartDate(date)} />*/}
                            {/*<DatePicker*/}
                            {/*    selected={startDate}*/}
                            {/*    onChange={(date) => setStartDate(date)}*/}
                            {/*    selectsStart*/}
                            {/*    startDate={startDate}*/}
                            {/*    // endDate={endDate}*/}
                            {/*/>*/}
                            {/*<DatePicker*/}
                            {/*    locale="ru"*/}
                            {/*    selected={endDate}*/}
                            {/*    onChange={(date) => setEndDate(date)}*/}
                            {/*    selectsEnd*/}
                            {/*    startDate={startDate}*/}
                            {/*    endDate={endDate}*/}
                            {/*    minDate={startDate}*/}
                            {/*/>*/}
                        </div>

                        {/*<div>*/}
                        {/*    {console.log(descriptionTask + "000")}*/}
                        {/*    <DatePicker locale="ru" format='yyyy-MM-dd' defaultValue={data_task.date_end} selected={endDate} onChange={(date) => setEndDate(date)} />*/}
                        {/*</div>*/}
                        <Form.Select>
                            <option>Важность</option>
                            <option value="1">Низкая</option>
                            <option value="2">Средняя</option>
                            <option value="3">Высокая</option>
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




