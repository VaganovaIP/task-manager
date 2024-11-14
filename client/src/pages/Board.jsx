import * as React from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

export const Board = props =>{
    const {name} = useParams()
    const location = useLocation()

    const [nameList, setNameList] = useState("")

    const {id} = location.state;
    return(
        <div>

            <h1>Board {id} </h1>
            <form  >
                <input type="text"
                       value={nameList}
                       placeholder=""
                       onChange={(e) => setNameList(e.target.value)}
                />
                <button type="submit">Добавить колонку</button>
            </form>



        </div>
    )
}