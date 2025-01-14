import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useRef, useState} from "react";

export const RenderTaskList = ({task, list}) =>{
    return (
            <Card className="task-card"  key={task.task_id}>
                <Card.Body>
                    <Card.Title className="name-task">
                        {task.name_task}
                    </Card.Title>
                </Card.Body>
            </Card>
    )
}