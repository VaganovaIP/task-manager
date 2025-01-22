import axios from "axios";
import {BASE_API_URL} from "../utils/api.js";


export const addMemberBoard=async (name_board, user_id, board_id) => {
    await axios
        .post(`${BASE_API_URL}/board/${name_board}`, {
            formName: "form-add-members",
            user_id: user_id,
            board_id: board_id
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const deleteMemberBoard = async (member_id, name_board) => {
    await axios
        .delete(`${BASE_API_URL}/board/${name_board}`, {
            data:{
                formName: "form-delete-member",
                member_id: member_id
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};