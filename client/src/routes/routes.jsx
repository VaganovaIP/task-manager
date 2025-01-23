import * as React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ListBoards, MainPage, Login, KanbanBoard, ListTasks, Register} from "../pages/index"
import {Suspense} from "react";

export default function RoutesApp(){
    return(
        <Suspense fallback={<div>Загрузка...</div>}>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/boards" element={<ListBoards/>}></Route>
                <Route path="/board/:name_board" element={<KanbanBoard/>}></Route>
                <Route path="/all-tasks" element={<ListTasks/>}></Route>
            </Routes>
        </BrowserRouter>
        </Suspense>



    )
}

