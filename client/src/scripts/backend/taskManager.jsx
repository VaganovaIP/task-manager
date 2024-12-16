import axios  from "axios";
import {BASE_API_URL} from "../../utils/api.js";


export async function fetchDataBoard(board_id, name, setLists, setTasks, setMembers, setAssignments) {
    await axios
        .get(`${BASE_API_URL}/board/${name}`, {
            params: {
                id: board_id
            }
        })
        .then(res => {
            setTasks(res.data.tasks);
            setLists(res.data.lists);
            setMembers(res.data.members);
            setAssignments(res.data.assignments);
            console.log(res.data.assignments)
        })
}

export async function viewBoards(boards, setBoards) {
    await axios
        .get(`${BASE_API_URL}/boards`)
        .then(data => {
            setBoards(data.data)
            console.log(data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
};

export const createList = async (name_board, name_list, board_id) => {
    await axios
        .post(`${BASE_API_URL}/board/${name_board}`, {
        formName:"form-add-list",
        board_id: board_id,
        nameList: name_list,
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const createTask = async (task_id, name_board, list_id, board_id, name_task, owner_id) => {
    console.log(name_board, "create task")
    await axios
        .post(`${BASE_API_URL}/board/${name_board}`, {
        formName:"form-add-task",
        task_id:task_id,
        board_id: board_id,
        name_task: name_task,
        list_id:list_id,
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


export const onAddAssignmentTask = async (name_board, user_id, task_id)=>{
    await axios
        .post(`${BASE_API_URL}/board/${name_board}`,{
        formName:"form-add-assignments",
        task_id:task_id,
        user_id:user_id
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

