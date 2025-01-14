import React from 'react';
import './index.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {CDBIcon} from "cdbreact";
import {Link} from "react-router-dom";

export const HeaderMenu=()=>{
    return (
            <Navbar expand="lg" className="bg-body-tertiary" >
                <Container fluid>
                    <Navbar.Brand href="#">Taskania</Navbar.Brand>
                    <div className="user-info">
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                    </div>
                </Container>
            </Navbar>

    );
}

export const Menu = () => {
    return (
        <div className="navigation">
            <div className="header-menu"></div>
            <hr className="hr-line"/>
            <ul className="box-menu">
                <li className="menu-item" title="Список досок"><Link to={"/boards"}> <i className="fa fa-th-large"> </i></Link></li>
                {/*<li className="menu-item" title="Список задач"><Link to={"/ListBoards"}> <i className="fa fa-th-list"> </i></Link></li>*/}
            </ul>
            <hr className="hr-line"/>
            <div className="footer-menu">
            </div>
        </div>
    )
}