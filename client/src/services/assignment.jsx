import axios  from "axios";
import {BASE_API_URL} from "../utils/api.js";



export const onAddAssignmentTask = async (name_board, user_id, task_id, token, text_event)=>{
    await axios
        .post(`${BASE_API_URL}/board/${name_board}`,{
                formName:"form-add-assignments",
                task_id:task_id,
                user_id:user_id,
                text_event: text_event,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const deleteAssignment = async (assignment_id, name_board, token, text_event) => {
    await axios
        .delete(`${BASE_API_URL}/board/${name_board}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data:{
                formName: "form-delete-assignment",
                assignment_id: assignment_id,
                text_event:text_event,
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

