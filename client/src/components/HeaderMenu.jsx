import React, {useState} from 'react';
import '../styles/1.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import {CDBLink, CDBSidebar, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from "cdbreact";
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
                <li className="menu-item" title="Список задач"><Link to={"/boards"}> <i className="fa fa-th-list"> </i></Link></li>


            </ul>
            <hr className="hr-line"/>
            <div className="footer-menu">

            </div>
            {/*<CDBSidebar textColor="#212529" backgroundColor="#465AA0" maxWidth="160px" className="box-menu">*/}
            {/*    <CDBSidebarHeader className="menu-name" prefix={<i className="fa fa-bars"/> }>*/}
            {/*    </CDBSidebarHeader>*/}
            {/*    <CDBSidebarMenu>*/}
            {/*        <i className="th th-list"/>*/}
            {/*        <CDBSidebarMenuItem className="menu-item">*/}
            {/*            <Link to={"/boards"}>Список досок</Link>*/}
            {/*        </CDBSidebarMenuItem>*/}
            {/*        /!*<CDBSidebarMenuItem className="menu-item" icon="th-list">Список задач</CDBSidebarMenuItem>*!/*/}
            {/*    </CDBSidebarMenu>*/}

            {/*    <CDBSidebarFooter style={{ textAlign: 'center' }}>*/}
            {/*        <div*/}
            {/*            className="sidebar-btn-wrapper"*/}
            {/*            style={{padding: '10px 5px'}}*/}
            {/*        >*/}

            {/*        </div>*/}
            {/*    </CDBSidebarFooter>*/}
            {/*</CDBSidebar>*/}
        </div>
    )
}