import axios from "axios";
import {BASE_API_URL} from "../utils/api.js";


export const registerUser = async (username, first_name, last_name, email, password, setError, setSuccess) =>{
    await axios
        .post(`${BASE_API_URL}/register`,{
            username:username,
            first_name:first_name,
            last_name:last_name,
            email:email,
            password:password
        })
        .then(function (response) {
            setSuccess('Пользователь успешно зарегистрирован');
            setError('');
        })
        .catch(function (error) {
            if (error.response && error.response.status === 401) {
                setError('Пользователь уже существует'); // Устанавливаем сообщение об ошибке
                setSuccess('');
            } else {
                setError('Ошибка сервера');
                setSuccess('');
            }
        });
}
export const loginUser = async (email, password, setError, setSuccess, setToken) =>{
    await axios
        .post(`${BASE_API_URL}/login`,{
            email:email,
            password:password
        })
        .then(function (response) {
            if (response.data.accessToken) {
                console.log(response.data)
                setToken(response.data.accessToken);
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('email', response.data.email);
            }
            setSuccess('');
            setError('');
            console.log(response.data.accessToken);
        })
        .catch(function (error) {
            if (error.response && error.response.status === 404) {
                setError('Пользователь не существует');
                setSuccess('');
            } else {
                setError('Ошибка сервера');
                setSuccess('');
            }
            if (error.response && error.response.status === 401) {
                setError('Неправильный пароль');
                setSuccess('');
            }

        });
}

