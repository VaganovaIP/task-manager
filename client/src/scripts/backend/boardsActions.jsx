import {useCallback, useState} from "react";
import {redirect, Navigate} from "react-router-dom";
import axios from "axios";
import {BASE_API_URL} from "../../utils/api";

export async function getAllBoards(boards, setBoards) {
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

export const createBoard = async (name_board, board_id) => {
    const email = "user1@.ru";
    await axios.post(`${BASE_API_URL}/boards`, {
        board_id: board_id,
        name_board: name_board,
        email: email,
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};