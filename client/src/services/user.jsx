import axios from "axios";
import {BASE_API_URL} from "../utils/api.js";

export const updateDataUser = async (user_id, username, first_name, last_name, path, token) => {
    await axios
        .put(`${BASE_API_URL}${path}`, {
                user_id: user_id,
                username: username,
                first_name: first_name,
                last_name:last_name,
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