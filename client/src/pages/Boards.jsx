import {useEffect, useState} from "react";

function Boards() {
    const [boards, setBoards] = useState([]);
    const getApiData = async () => {
        const response = await fetch('http://localhost:5000/boards')
            .then((response) => response.json());
        // Обновим состояние
        setBoards(response);
    };

    useEffect(() => {
        getApiData();
    }, []);

    const [data, setData] = useState({});

    const handleSubmit = async () => {
        const name = "ee";
        const email = "sdjk";
        await fetch('http://localhost:5000/boards', {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(response => response.json());
    };

    return (
        <div >
            <header className="d-flex p-2 flex-column mb-3">
            </header>
            <div className="main-content">
                <div className="p-2 flex-shrink-1">Flex item
                </div>
                <div className="p-2 w-100">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name_board" />
                        <button type="submit">Submit</button>
                    </form>
                    <div>
                    {boards.map((board, id) =>{
                        console.log(board.name_board);
                        return <li key={id}> {board.name_board}</li>
                    } )}
                </div>Flex item</div>
            </div>
            <footer className="footer">
            </footer>
        </div>
    )
}
const header = ()=>{

}

export default Boards