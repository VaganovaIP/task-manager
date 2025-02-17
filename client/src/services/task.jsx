import axios from "axios";
import {BASE_API_URL} from "../utils/api.js";



export async function fetchDataBoard(board_id, name, setLists, setTasks,
                                     setMembers, setAssignments, setUsers, setBoardName, token, email, setUser) {
    console.log(board_id)
    await axios
        .get(`${BASE_API_URL}/board/${name}?type=data`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                board_id: board_id,
                email:email
            }
        })
        .then(res => {
            setTasks(res.data.tasks);
            setLists(res.data.lists);
            setMembers(res.data.members);
            setAssignments(res.data.assignments);
            setUsers(res.data.users);
            setBoardName(res.data.board);
            setUser(res.data.user);
        })
}

export async function fetchDataTasks(email, setTasks, token, setUser) {
    await axios
        .get(`${BASE_API_URL}/all-tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                email: email
            }
        })
        .then(res => {
            setTasks(res.data.tasks);
            setUser(res.data.user);
        })
}
export const createTask = async (task_id, name_board, list_id, board_id, name_task, email, token, text_event) => {
    await axios
        .post(`${BASE_API_URL}/board/${name_board}`, {
            formName:"form-add-task",
            task_id:task_id,
            board_id: board_id,
            name_task: name_task,
            list_id:list_id,
            email:email,
            text_event:text_event,
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
};

export const saveTask = async (task_id, name, description, dateStart, dateEnd, list_id, importance, status, name_board, token, statusEdit, text_event)=>{
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
            status:status,
            statusEdit: statusEdit,
            text_event:text_event
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

export const deleteTask = async (task_id, name_board, email, token) => {
    await axios
        .delete(`${BASE_API_URL}/board/${name_board}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data:{
                formName: "form-delete-task",
                task_id: task_id
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};