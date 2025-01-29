import "./login.css"
import {Link, Navigate, redirect} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {HeaderMain} from "../../components/HeaderMain.jsx";
import Form from "react-bootstrap/Form";
import {loginUser, registerUser} from "../../services/auth.jsx";

const Login = ({ setToken }) =>{
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorInput, setErrorInput] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onLoginSubmit = (event) => {
        event.preventDefault();
        setEmailError(false);
        setPasswordError(false);
        if (!email) {
            setEmailError(true)
            setErrorInput(true)
        }
        if (!password) {
            setPasswordError(true)
            setErrorInput(true)
        }

        if (email && password){
            loginUser(email, password, setError, setSuccess, setToken);
            setErrorInput(false);
            navigate("/boards");

        }

    }

    return(
        <div className="main-page-content">
            <HeaderMain></HeaderMain>
            <section className="main-content-main">
                <div className="auth-reg">
                    <div className="title-auth-reg">
                        Войти в аккаунт
                    </div>
                    <form classs="form-auth-reg" method="post" onSubmit={onLoginSubmit}>
                        <div className="title-message-error">{errorInput ? "Заполните поля" : ""}</div>
                        <Form.Control type="email" className={!emailError ? "form-input-login" : "input-error"}
                                      placeholder="Email*"
                                      value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="text" className={!passwordError ? "form-input-login" : "input-error"}
                               placeholder="Пароль*"
                               value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button className="form-button" type="submit" name="form-auth-button">Войти</button>
                        <div className="title-message-ok">{success}</div>
                        <div className="title-message-error">{error}</div>
                        <p className="auth-text">
                            Не зарегистрирован?
                            <Link to={"/register"} className="reg-link"> Зарегистрироваться!</Link>
                        </p>
                    </form>

                </div>
            </section>

            <footer className="main-footer">

            </footer>
        </div>
    )
}

export default Login