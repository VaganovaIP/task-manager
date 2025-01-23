import React from 'react';
import './index.css'
import {Link} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export const HeaderMenu=()=>{
    return (
        <header className="main-header">
            <div className="logo">
                <a href="main.html" className="logo-name">Taskania</a>
            </div>
            <nav className="main-menu">
                <div className="user-info">
                    <i className="bi bi-person-circle" aria-hidden="true"></i>
                </div>
            </nav>
        </header>
    );
}

export const Menu = () => {
    return (
        <div className="navigation">
            <div className="header-menu"></div>
            <hr className="hr-line"/>
            <ul className="box-menu">
                <li className="menu-item" title="Список досок"><Link to={"/boards"}> <i className="bi bi-grid-fill"> </i></Link></li>
                <li className="menu-item" title="Список задач"><Link to={"/all-tasks"}> <i className="bi bi-list-task"> </i></Link></li>
            </ul>
            <hr className="hr-line"/>
            <div className="footer-menu">
            </div>
        </div>
    )
}