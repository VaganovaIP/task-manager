import React, { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css"
import {useNavigate} from "react-router-dom";

function ProfileUser({userInfo}) {
    const navigate = useNavigate();
    const logOut = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate(`/login`,{replace: false});
    }

    return (
        <div className="user-profile">
            <div className="header-profile">
                <p>Профиль</p>
                <div className='icon'>
                    <i className="bi bi-person-circle" aria-hidden="true"></i>
                </div>

            </div>
            <hr className="hr-line-user"/>
            <div className="user-content">
                <div className="name-user">
                    <div className="name">{userInfo.first_name} {userInfo.last_name}</div>
                    <div className="username">{userInfo.username}</div>
                    <div className="title">Имя пользователя</div>
                </div>
                <hr className="hr-line-user"/>
                <div className="info-content">
                    <div className="icon1">
                        <i className="bi bi-at"></i>
                    </div>
                    <div className="group1">
                        <div className="name">{userInfo.email}</div>
                        <div className="title">Email</div>
                    </div>
                </div>
            </div>
            <hr className="hr-line-user"/>
            <div className="log-out" onClick={logOut}>
                <p className="name">Выйти</p>
                <div className="icon2">
                    <i className="bi bi-box-arrow-right"></i>
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;