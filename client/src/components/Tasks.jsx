import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useRef, useState} from "react";

export const RenderTaskList = ({task, list}) =>{
    return (

            <Card className="task-card"  key={task.task_id}>
                <Card.Body>
                    <Card.Title className="name-task">
                        {task.name_task}
                        {/*<Link to={`/board/${item.name_board}`} state = {{id:item.board_id}}>{item.name_board}</Link>*/}
                    </Card.Title>
                    <Card.Text className="date-task">
                        {/*{task.date_start} - {task.date_end}*/}
                    </Card.Text>
                </Card.Body>
                <div className="delete-task">
                    <Button className="delete-task-btn" variant="secondary" type="submit">
                        <i className="bi bi-trash"></i>
                    </Button>
                </div>

            </Card>

    )

}