import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import React, {useEffect, useState} from "react";
import {addMemberBoard} from "../../services/member.jsx"
import Fuse from "fuse.js";
import "./index.css"


export function ModalAddMembers(props){
    const {members, users, name_board, board_id, token, show} = props;
    const [searchResults, setSearchResults] = useState(users);
    const options = {keys:["username", "first_name", "last_name"]};
    const fuse = new Fuse(users, options);
    const [onSearch, setOnSearch] = useState(false);

    useEffect(()=>{
        setSearchResults(null)
        setOnSearch(false);
    },[])

    const onChangeUserSearch = (event) =>{
        const {value} = event.target;
        if (value.length === 0){
            setSearchResults(null);
            setOnSearch(false);
            return;
        }
        const results = fuse.search(value);
        const items = results.map((result) => result.item);
        const filterItems = items.filter((item) => !members.some((item2)=>item.user_id === item2.user_id))
        setSearchResults(filterItems);
        setOnSearch(true);
    }

    const onClickAddMember = (user_id) =>{
        addMemberBoard(name_board, user_id, board_id, token);
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
            <Modal.Body  className="modal-data-user">
                <Form.Control
                    type="search"
                    placeholder="Поиск"
                    className="me-2"
                    aria-label="Search"
                    onChange={onChangeUserSearch}
                    name=""
                />
                {
                    onSearch &&
                    searchResults?.map((user) =>(
                        <li key={user.user_id}>
                            <div className="member-info">
                                <div className="user-app">
                                    <p className="name-member">{user.username}</p>
                                    <p className="user-app-full">{user.first_name} {user.last_name}</p>
                                </div>
                                <button className="members-btn-add"
                                        type="button" onClick={() => onClickAddMember(user.user_id)}>
                                    Добавить
                                </button>
                            </div>
                        </li>
                ))}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )

}