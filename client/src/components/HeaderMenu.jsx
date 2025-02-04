import React, {useState} from 'react';
import './index.css'
import {Link} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProfileUser from "../modals/User/ProfileUser.jsx";



export const HeaderMenu=({userInfo})=>{

    const [show, setShow] = useState(true);
    const Show = () => setShow(!show);

    return (
        <header className="main-header">
            <div className="logo">
                <p className="logo-name" >Taskania</p>
            </div>
            <nav className="main-menu">
                <div className="user-info" onClick={Show}>
                    <i className="bi bi-person-circle" aria-hidden="true"></i>
                </div>
                {
                    !show && <ProfileUser user={userInfo}></ProfileUser>
                }
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