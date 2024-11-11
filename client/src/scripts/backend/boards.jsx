import {useCallback, useState} from "react";
import {redirect, Navigate} from "react-router-dom";
import axios from "axios";


export async function getBoards(boards, setBoards) {
    axios
        .get('http://localhost:5000/boards')
        .then(data => {
            setBoards(data.data)
        })
    return setBoards;
};

export const addBoard = async (name_board, board_id) => {
    const email = "user1@.ru";
    await fetch('http://localhost:5000/boards/board/' + name_board, {
        method: "POST",
        body: JSON.stringify({
            board_id,
            name_board,
            email,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then(response => response.json());
};