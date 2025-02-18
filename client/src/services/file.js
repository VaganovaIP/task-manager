import axios from "axios";
import {BASE_API_URL} from "../utils/api.js";


export const uploadFile = async (name_board, formData, task_id, token) => {
    await axios
        .post(`${BASE_API_URL}/board/${name_board}/upload_file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data; charset=UTF-8',
                Authorization: `Bearer ${token}`,
                'task-id':  task_id,
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const fetchFilesTask = async (name_board, task_id, setFilesTask, token, setHistory) => {
    await axios
        .get(`${BASE_API_URL}/board/${name_board}/files`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                task_id: task_id
            }
        })
        .then(res => {
            setFilesTask(res.data.files);
            setHistory(res.data.history);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const downloadFile = async (name_board, task_id, name_file, token) =>{
    await fetch(`${BASE_API_URL}/board/${name_board}/download`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'task_id': task_id,
                'file_name': encodeURIComponent(name_file)
        }}
    )
        .then(async function (response) {
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = name_file;
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const deleteFile = async (name_board, file_id, task_id, file_name, token) => {
    await axios
        .delete(`${BASE_API_URL}/board/${name_board}/delete_file`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data:{
                formName: "form-delete-file",
                file_id: file_id,
                task_id: task_id,
                file_name: file_name
            },
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};