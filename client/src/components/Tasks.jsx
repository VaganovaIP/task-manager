import Card from "react-bootstrap/Card";
import React from "react";

export const RenderTaskList = ({task}) =>{
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