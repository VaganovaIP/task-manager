import React, {useEffect, useState} from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css"
import {useNavigate} from "react-router-dom";

function ProfileUser({userInfo}) {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [nameUser, setNameUser] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [Edit, setEdit] = useState(false)
    const [usernameError, setUsernameError] = useState(false);


    useEffect(()=>{
        setNameUser(userInfo.username)
        setFirstName(userInfo.first_name)
        setLastName(userInfo.last_name)
    },[userInfo])
    const logOut = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate(`/login`,{replace: false});
    }

    const saveInfo=()=>{
        if(!nameUser) return setUsernameError(true);

    }

    return (
        <div>
            <div className="user-profile">
                <div className="header-profile">
                    <p className="name">Профиль</p>
                    <div className='icon'>
                        <i className="bi bi-person-circle" aria-hidden="true"></i>
                    </div>
                </div>
                <hr className="hr-line-user"/>
                <div className="user-content">
                    {
                        show ?  <div className="name-user">
                            <div className="name">{userInfo.first_name} {userInfo.last_name}</div>
                            <div className="username">{userInfo.username}</div>
                            <div className="title">Имя пользователя</div>
                        </div> :
                            <div>
                                <input type="text" className={!usernameError ? "form-input-user" : "input-error-user"}
                                       placeholder="Имя пользователя"
                                       defaultValue={nameUser} onChange={(e)=>setNameUser(e.target.value)}/>
                                <input type="text" className="form-input-user"
                                       placeholder="Имя"
                                       value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                                <input type="text" className="form-input-user" placeholder="Фамилия"
                                       value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                            </div>
                    }
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
                {
                        show ? (
                           <div className="log-out">
                               <p className="name" onClick={()=>setShow(false)}>Изменить</p>
                               <div className="info-content" onClick={logOut}>
                                   <p className="name">Выйти </p>
                                   <div className="icon2" title="Выйти ">
                                       <i className="bi bi-box-arrow-right"></i>
                                   </div>
                               </div>
                           </div>
                        ) :       <div className="log-out">
                            <p className="name" onClick={saveInfo}>Сохранить</p>
                            <div className="info-content2" onClick={()=>setShow(true)}>
                                <p className="name">Отмена</p>
                            </div>
                        </div>
                    }


            </div>
        </div>
)
}

export default ProfileUser;