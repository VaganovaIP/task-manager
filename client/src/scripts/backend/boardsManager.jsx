import axios from "axios";
import {BASE_API_URL} from "../../utils/api";

export async function fetchAllBoards(boards, setBoards) {
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

export const createBoard = async (name_board, board_id, email) => {
    await axios
        .post(`${BASE_API_URL}/boards`, {
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
