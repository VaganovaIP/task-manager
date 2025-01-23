import {Link} from "react-router-dom";
import React from "react";
import "./index.css"



export const HeaderMain=()=>{
    return (
        <header className="main-header">
            <div className="logo">
                <a href="main.html" className="logo-name">Taskania</a>
            </div>
            <nav className="main-menu">
                <ul className="main-menu-list">
                    <li>
                        <Link to={"/login"} className="main-menu-item">Вход</Link>
                    </li>
                    <li>
                        <a href="registration.html" className="main-menu-item">Регистрация</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
