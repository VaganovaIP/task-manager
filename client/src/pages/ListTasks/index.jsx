import React, {useEffect, useRef} from 'react';
import {HeaderMenu, Menu} from "../../components/HeaderMenu.jsx";
import Form from "react-bootstrap/Form";
import "./all-tasks.css"
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import {Accordion} from "react-bootstrap";

const ListTasks=()=>{


    return(
        <div className="f-container">
            <HeaderMenu></HeaderMenu>
            <div className="main">
                <div className="main-menu-content">
                    <Menu></Menu>
                </div>
                <div className="content">
                    <div className="action-page">
                        <div className="name-page">Список задач
                        </div>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Поиск"
                                className="me-2"
                                aria-label="Search"
                                // onChange={onChangeBoardSearch}
                            />
                        </Form>
                    </div>
                    <div className="tasks-content">
                        <div className="tasks-list-header">
                            <div className="task-header">
                                <p className="name-task-header">Название задачи</p>
                                <div className="info-header">
                                    <p className="status">Приоритет</p>
                                    <p className="date-start">Дата начала</p>
                                    <p className="date-last">Дата конца</p>
                                    <p className="status">Статус</p>
                                </div>
                            </div>
                            <div className="tasks-list">
                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>                                <Accordion >
                                    <Accordion.Item eventKey="0" >
                                        <Accordion.Header>

                                            <li className="task-item">
                                                <div className="name-task-list">First</div>
                                                <div className="info">
                                                    <p className="status">
                                                        Низкая
                                                    </p>
                                                    <p className="date-start">
                                                        <hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="date-last"><hr className="custom-hr"/>
                                                        21.06.24</p>
                                                    <p className="status">CC</p>
                                                </div>
                                            </li>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="info">
                                                <p className="status">
                                                    Низкая
                                                </p>
                                                <p className="date-start">
                                                    <hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="date-last"><hr className="custom-hr"/>
                                                    21.06.24</p>
                                                <p className="status">CC</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                        </div>
                        <div className="filters">
                            <Form.Group className="filter">
                                <div className="date">
                                    <i className="fa fa-calendar"/>
                                    <DatePicker className="form-input"  locale={'ru'} placeholderText="Дата начала"
                                    />
                                </div>
                                <div className="date">
                                    <i className="fa fa-calendar"/>
                                    <DatePicker className="form-input"  locale={'ru'} placeholderText="Дата конца"
                                    />
                                </div>
                                <div className="importance">
                                    <p>Важность</p>
                                    <Form.Select className="form-input"
                                                 title="Важность" >
                                        <option value=""></option>
                                        <option value="Низкая">Низкая</option>
                                        <option value="Средняя">Средняя</option>
                                        <option value="Высокая">Высокая</option>
                                    </Form.Select>
                                </div>

                                <div className="filter-status">
                                    <p>Статус задачи</p>
                                    <div className="status">
                                        <Form.Check type={'checkbox'} checked={status || false} onChange={() => setStatus(!status)}>
                                        </Form.Check>
                                        <p className="label-status">{status ? "Выполнена" : "Не выполнена"}</p>
                                    </div>
                                </div>
                                <div className="action-filter">
                                    <Button  className="button-filter">
                                        Показать
                                    </Button>
                                    <Button  className="button-filter-no">
                                        Сбросить
                                    </Button>
                                </div>

                            </Form.Group>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListTasks