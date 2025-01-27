import * as React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {ListBoards, MainPage, Login, KanbanBoard, ListTasks, Register} from "../pages/index"
import {Suspense, useState} from "react";

export default function RoutesApp(){
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [email, setEmail] = useState(localStorage.getItem('email'));

    return(
        <Suspense fallback={<div>Загрузка...</div>}>
            <BrowserRouter>
            <Routes>
                <Route path="/home" element={<MainPage/>}></Route>
                <Route path="/login" element={<Login setToken={setToken}/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/boards" element={token ? <ListBoards token={token} email={email}/> : <Navigate to="/login" />}></Route>
                <Route path="/board/:name_board" element={<KanbanBoard token={token} email={email}/>}></Route>
                <Route path="/all-tasks" element={<ListTasks token={token} email={email}/>}></Route>
                {console.log(token)}
                {console.log(email)}
            </Routes>
        </BrowserRouter>
        </Suspense>



    )
}

