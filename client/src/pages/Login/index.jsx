import "./login.css"
import {Link} from "react-router-dom";
import React from "react";
import {HeaderMain} from "../../components/HeaderMain.jsx";
import Form from "react-bootstrap/Form";

const Login = () =>{
    return(
        <div className="main-page-content">
            <HeaderMain></HeaderMain>

            <section className="main-content-main">
                <div className="auth-reg">
                    <div className="title-auth-reg">
                        Войти в аккаунт
                    </div>

                    <form classs="form-auth-reg" action="/boards" method="post">
                        <Form.Control type="email" className="form-input-login" placeholder="Email"
                        />
                        <input type="text" className="form-input-login" placeholder="Пароль"/>
                        <button className="form-button" type="submit" name="form-auth-button">Войти</button>
                        <p className="auth-text">
                            Не зарегистрирован?
                            <Link to={"/boards"} className="reg-link"> Зарегистрироваться!</Link>
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