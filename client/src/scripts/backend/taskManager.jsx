import axios  from "axios";
import {BASE_API_URL} from "../../utils/api.js";


export async function getDataBoard(board_id, name, setLists, setTasks, setMembers) {
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
        })
}

// async function getAllLists() {
//     await axios
//         .get(`${BASE_API_URL}/boards/board/:board_id`)
//         .then(res => {
//             console.log(res.data.lists);
//         })
// }


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
    await axios.post(`${BASE_API_URL}/board/${name_board}`, {
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

export const createTask = async (name_board, list_id, board_id, name_task) => {
    console.log(name_board, "create task")
    await axios.post(`${BASE_API_URL}/board/${name_board}`, {
        formName:"form-add-task",
        board_id: board_id,
        name_task: name_task,
        list_id:list_id
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

