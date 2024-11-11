import * as React from 'react';
import {useParams} from "react-router-dom";
import {useState} from "react";

export default function Board(){
    const {name} = useParams()
    const {board_id} = useParams()

    const [nameList, setNameList] = useState("")

    return(
        <div>

            <h1>Board {name} </h1>
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