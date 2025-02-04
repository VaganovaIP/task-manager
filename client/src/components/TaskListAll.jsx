import {Accordion} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import React from "react";
import convertDate from "../utils/helpers.jsx";

const renderListTasks=(task)=>{
    return(
        <Accordion key={task.task_id}>
            <Accordion.Item eventKey="0" >
                <Accordion.Header>
                    <li className="task-item">
                        <div className="name-task-list">{task.Task?.name_task}</div>
                        <div className="info">
                            <p className="title-info">{task.Task?.importance}</p>
                            <p className="title-info">
                                {convertDate(task.Task?.date_start)}</p>
                            <p className="title-info">
                                {convertDate(task.Task?.date_end)}</p>
                            <Form.Check type={'checkbox'} checked={task.Task?.status} disabled={true}>
                            </Form.Check>
                        </div>
                    </li>
                </Accordion.Header>
                <Accordion.Body>
                    <div className="full-info">
                        <div className="column1">
                            <p className="title">
                                Описание
                            </p>
                            <p className="description">{task.Task?.description}</p>
                        </div>
                        <div className="column2">
                            <p className="title">
                                Автор
                            </p>
                            <p>{task.Task?.User.username}</p>
                            <p className="name-author">({task.Task?.User.first_name} {task.Task?.User.last_name})</p>
                            <p className="title">
                                Доска
                            </p>
                            <div className="name-board-link">
                                {task.Task?.Board.name_board}
                                <Link to={`/board/${task.Task?.Board.name_board}`}
                                      state = {{board_id:task.Task?.Board.board_id, name_board:task.Task?.Board.name_board}}>
                                    <i className="bi bi-box-arrow-up-right"></i>
                                </Link>
                            </div>
                            <p className="title">
                                Колонка
                            </p>
                            <p>{task.Task?.List.name_list}</p>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default renderListTasks;