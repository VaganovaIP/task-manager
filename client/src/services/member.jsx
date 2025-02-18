import axios from "axios";
import {BASE_API_URL} from "../utils/api.js";


export const addMemberBoard = async (name_board, user_id, board_id, token) => {
    console.log(user_id)
    console.log(board_id)
    await axios
        .post(`${BASE_API_URL}/board/${name_board}/add_member`, {
            user_id: user_id,
            board_id: board_id
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

export const deleteMemberBoard = async (member_id, name_board, token) => {
    await axios
        .delete(`${BASE_API_URL}/board/${name_board}/delete_member`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data:{
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