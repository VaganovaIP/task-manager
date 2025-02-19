import Card from "react-bootstrap/Card";
import React from "react";

export const RenderTaskList = ({task}) =>{
    return (
            <Card  className={!task.status ? "not-done-task" : "task-card"} key={task.task_id}>
                <Card.Body className="task-body">
                    <div>
                        <Card.Title className="name-task">
                            {task.name_task}
                        </Card.Title>
                    </div>
                </Card.Body>
            </Card>
    )
}