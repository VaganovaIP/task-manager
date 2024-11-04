import {useState} from "react";

export const getBoards = async (boards, setBoards) => {
    const response = await fetch('http://localhost:5000/boards')
        .then((response) => response.json());
    setBoards(response);
};

export const addBoard = async () => {
    const name_board = "board test";
    const email = "user1@.ru";
    await fetch('http://localhost:5000/boards', {
        method: "POST",
        body: JSON.stringify({
            name_board,
            email,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then(response => response.json());
};