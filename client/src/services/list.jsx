import axios from "axios";
import {BASE_API_URL} from "../utils/api.js";


export const createList = async (list_id, name_board, name_list, board_id, token) => {
    await axios
        .post(`${BASE_API_URL}/board/${name_board}/add_list`, {
                list_id:list_id,
                board_id: board_id,
                nameList: name_list,
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

export const updateNameList = async (updateName, list_id, name_board, token) => {
    await axios
        .put(`${BASE_API_URL}/board/${name_board}/update_list`, {
                list_id: list_id,
                name_list: updateName,
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

export const deleteList = async ( list_id, name_board, token) => {
    await axios
        .delete(`${BASE_API_URL}/board/${name_board}/delete_list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data:{
                list_id: list_id
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};