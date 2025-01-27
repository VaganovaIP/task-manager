import axios from "axios";
import {BASE_API_URL} from "../utils/api.js";
import {useState} from "react";


export async function fetchAllBoards(boards, setBoards, token) {
    await axios
        .get(`${BASE_API_URL}/boards`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(data => {
            setBoards(data.data)
            console.log(data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
};

export const createBoard = async (name_board, board_id, email) => {
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

export const updateNameBoard = async (updateName, board_id, name_board) => {
    console.log(updateName);
    await axios
        .put(`${BASE_API_URL}/board/${name_board}`, {
            formName: "form-update-board",
            board_id: board_id,
            name_board: updateName,
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const deleteBoard = async (board_id) => {
    await axios
        .delete(`${BASE_API_URL}/boards`, {
            data:{
                formName: "form-delete-assignment",
                board_id: board_id
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export class addMemberBoard {
}