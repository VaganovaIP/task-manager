import axios  from "axios";
import {BASE_API_URL} from "../../utils/api.js";


export async function getAllTasks(board_id, name, setLists, setTasks) {
    await axios
        .get(`${BASE_API_URL}/board/${name}`, {
            params: {
                id: board_id
            }
        })
        .then(res => {
            setTasks(res.data.tasks);
            setLists(res.data.lists);
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