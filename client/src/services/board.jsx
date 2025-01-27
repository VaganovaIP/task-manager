import axios from "axios";
import {BASE_API_URL} from "../utils/api.js";


export async function fetchAllBoards(setBoards, token, email) {
    await axios
        .get(`${BASE_API_URL}/boards`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                email: email
            }
        })
        .then(data => {
            setBoards(data.data.boards)
            console.log(data.data.boards);
        })
        .catch(function (error) {
            console.log(error);
        })
};

export const createBoard = async (name_board, board_id, email, token) => {
    await axios
        .post(`${BASE_API_URL}/boards`, {
        board_id: board_id,
        name_board: name_board,
        email: email,
        },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            }}
        ).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const updateNameBoard = async (updateName, board_id, name_board, token) => {
    console.log(updateName);
    await axios
        .put(`${BASE_API_URL}/board/${name_board}`, {
            formName: "form-update-board",
            board_id: board_id,
            name_board: updateName,
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

export const deleteBoard = async (board_id, token) => {
    console.log(board_id)
    await axios
        .delete(`${BASE_API_URL}/boards`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params:{
                board_id: board_id
            },
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};
