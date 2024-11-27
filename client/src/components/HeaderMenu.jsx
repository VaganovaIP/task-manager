import React, {useState} from 'react';
import '../styles/1.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import {CDBLink, CDBSidebar, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from "cdbreact";
import {Link} from "react-router-dom";




export const HeaderMenu=()=>{
    const [searchName, setSearchName] = useState("");

    return (
            <Navbar expand="lg" className="bg-body-tertiary" >
                <Container fluid>
                    <Navbar.Brand href="#">Taskania</Navbar.Brand>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Поиск"
                            className="me-2"
                            aria-label="Search"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <Button className="action-page-button" variant="secondary" type="submit">Поиск</Button>
                    </Form>
                </Container>
            </Navbar>

    );
}

export const Menu=()=>{
    return (
        <div className="navigation">
            <CDBSidebar textColor="#212529" backgroundColor="#f8f9fa" maxWidth="200px">
                <CDBSidebarHeader className="menu-name" prefix={<i className="fa fa-bars"/> }>
                </CDBSidebarHeader>
                <CDBSidebarMenu>
                    <CDBSidebarMenuItem className="menu-item" >
                        <Link to={"/boards"}>Список досок</Link>
                    </CDBSidebarMenuItem>
                    {/*<CDBSidebarMenuItem className="menu-item" icon="th-list">Список задач</CDBSidebarMenuItem>*/}
                </CDBSidebarMenu>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{padding: '10px 5px'}}
                    >

                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    )
}