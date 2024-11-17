import * as React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Boards from '../pages/Boards';
import {KanbanBoard} from '../pages/KanbanBoard.jsx';
export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/boards" element={<Boards/>}></Route>
                <Route path="/board/:board_id" element={<KanbanBoard/>}></Route>
            </Routes>
        </BrowserRouter>

    )
}

