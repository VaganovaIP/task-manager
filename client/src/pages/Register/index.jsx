import "./register.css"
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {HeaderMain} from "../../components/HeaderMain.jsx";
import Form from "react-bootstrap/Form";
import {registerUser} from "../../services/auth.jsx";

const Register = () =>{
    const [nameUser, setNameUser] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('');
    const [errorInput, setErrorInput] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    useEffect(()=>{
        setSuccess('');
        setError('');
    },[email])
    const onRegisterSubmit=(event)=>{
        event.preventDefault();
        setEmailError(false);
        setUsernameError(false);
        setPasswordError(false);
        if (!nameUser){
            setUsernameError(true);
            setErrorInput(true)
        }
        if (!email) {
            setEmailError(true)
            setErrorInput(true)
        }
        if (!password) {
            setPasswordError(true)
            setErrorInput(true)
        }

        if (email && nameUser && password){
            registerUser(nameUser, firstName, lastName, email, password, setError, setSuccess)
            setErrorInput(false);
        }

    }

    return(
        <div className="main-page-content">
            <HeaderMain></HeaderMain>
            <section className="main-content-main">
                <div className="auth-reg">
                    <div className="title-auth-reg">
                        Регистрация аккаунта
                    </div>
                    <form classs="form-auth-reg" method="post" onSubmit={onRegisterSubmit}>
                        <div className="title-message-error">{errorInput ? "Заполните обязательные поля *" : ""}</div>
                        <input type="text" className={!usernameError ? "form-input-login" : "input-error"}
                               placeholder="Имя пользователя*"
                            value={nameUser} onChange={(e)=>setNameUser(e.target.value)}/>
                        <input type="text" className="form-input-login"
                               placeholder="Имя"
                               value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                        <input type="text" className="form-input-login" placeholder="Фамилия"
                               value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                        <Form.Control type="email" className={!emailError ? "form-input-login" : "input-error"}
                                      placeholder="Email*"
                                      value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="text" className={!passwordError ? "form-input-login" : "input-error"}
                               placeholder="Пароль*"
                               value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button className="form-button" type="submit" name="form-auth-button">Создать</button>
                        <div className="title-message-ok">{success}</div>
                        <div className="title-message-error">{error}</div>

                    </form>
                </div>
            </section>

            <footer className="main-footer">

            </footer>
        </div>
    )
}

export default Register