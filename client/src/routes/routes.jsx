import * as React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ListBoards, KanbanBoard, ListTasks, MainPage, Login} from "../pages/index"

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/boards" element={<ListBoards/>}></Route>
                <Route path="/board/:name_board" element={<KanbanBoard/>}></Route>
                <Route path="/all-tasks" element={<ListTasks/>}></Route>
            </Routes>
        </BrowserRouter>

    )
}

