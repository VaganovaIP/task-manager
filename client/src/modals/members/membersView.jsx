import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import {addMembersBoard} from "../../scripts/backend/boardsManager"
import Fuse from "fuse.js";
import "./index.css"


export function ModalAddMembers(props){
    const {members, users, name_board, board_id} = props;
    const [searchResults, setSearchResults] = useState(users);
    const options = {keys:["username"]};
    const fuse = new Fuse(users, options);
    const [onSearch, setOnSearch] = useState(false);

    const onChangeBoardSearch = (event) =>{
        const {value} = event.target;
        if (value.length === 0){
            setSearchResults(users);
            setOnSearch(false);
            return;
        }
        const results = fuse.search(value);
        const items = results.map((result) => result.item);
        const filterItems = items.filter((item) => !members.some((item2)=>item.user_id === item2.user_id))
        setSearchResults(filterItems);
        setOnSearch(true);
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal-window"
        >
            <Modal.Header closeButton>
                <div className="header-user-modal">
                    <Modal.Title id="contained-modal-title-vcenter" className="label-modal">
                        Добавить участника
                    </Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    type="search"
                    placeholder="Поиск"
                    className="me-2"
                    aria-label="Search"
                    onChange={onChangeBoardSearch}
                    name=""
                />
                {
                    onSearch &&
                    searchResults.map((user) =>(
                        <li key={user.user_id}>
                            <div className="member-info">
                                <p className="name-member">{user.username}</p>
                                <button className="add-button-member"
                                        type="button" onClick={() => addMembersBoard(name_board, user.user_id, board_id)}>
                                    <i className="bi bi-plus"></i>
                                </button>
                            </div>
                        </li>
                ))}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )

}