import * as React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ListBoards, KanbanBoard} from "../pages/index"

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="boards" element={<ListBoards/>}></Route>
                <Route path="board/:name_board" element={<KanbanBoard/>}></Route>
            </Routes>
        </BrowserRouter>

    )
}

