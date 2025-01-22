import axios from "axios";
import {BASE_API_URL} from "../utils/api.js";



export async function fetchDataBoard(board_id, name, setLists, setTasks,
                                     setMembers, setAssignments, setUsers, setBoardName) {
    await axios
        .get(`${BASE_API_URL}/board/${name}`, {
            params: {
                board_id: board_id
            }
        })
        .then(res => {
            setTasks(res.data.tasks);
            setLists(res.data.lists);
            setMembers(res.data.members);
            setAssignments(res.data.assignments);
            setUsers(res.data.users);
            setBoardName(res.data.board);
            console.log(res.data.board)
        })
}

export async function fetchDataTasks(email, setTasks) {
    await axios
        .get(`${BASE_API_URL}/all-tasks`, {
            params: {
                email: email
            }
        })
        .then(res => {
            setTasks(res.data.tasks);
        })
}
export const createTask = async (task_id, name_board, list_id, board_id, name_task, email) => {
    await axios
        .post(`${BASE_API_URL}/board/${name_board}`, {
            formName:"form-add-task",
            task_id:task_id,
            board_id: board_id,
            name_task: name_task,
            list_id:list_id,
            email:email,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const saveTask = async (task_id, name, description, dateStart, dateEnd, list_id, importance, status, name_board)=>{
    await axios
        .put(`${BASE_API_URL}/board/${name_board}`, {
            formName: "form-save-task",
            task_id:task_id,
            name_task:name,
            description:description,
            date_start:dateStart,
            date_end:dateEnd,
            list_id:list_id,
            importance:importance,
            status:status
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const deleteTask = async (task_id, name_board) => {
    const email = "user1@.ru";
    await axios
        .delete(`${BASE_API_URL}/board/${name_board}`, {
            data:{
                formName: "form-delete-task",
                task_id: task_id,
                email:email
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};