import * as React from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {HeaderMenu, Menu} from "../components/HeaderMenu.jsx";

export const KanbanBoard = props =>{
    const {name} = useParams()
    const location = useLocation()

    const [nameList, setNameList] = useState("")

    const {id} = location.state;
    return(
        <div className="f-container">
            <HeaderMenu></HeaderMenu>
            <div className="main">
                <div>
                    <Menu></Menu>
                </div>
                <div className="content">
                </div>
            </div>
        </div>
        // <div>
        //
        //     <h1>Board {id} </h1>
        //     <form  >
        //         <input type="text"
        //                value={nameList}
        //                placeholder=""
        //                onChange={(e) => setNameList(e.target.value)}
        //         />
        //         <button type="submit">Добавить колонку</button>
        //     </form>



        // </div>
    )
}