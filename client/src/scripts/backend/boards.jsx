import {useState} from "react";

export async function getBoards(boards, setBoards) {
    const response = await fetch('http://localhost:5000/boards')
        .then((res) => res.json());
    console.log("state get" + response);
    return setBoards(response);
};

export const addBoard = async (name_board) => {
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