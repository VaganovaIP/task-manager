import '../styles/1.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import {CDBSidebar, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from "cdbreact";




export const HeaderMenu=()=>{
    return (
            <Navbar expand="lg" className="bg-body-tertiary" >
                <Container fluid>
                    <Navbar.Brand href="#" text>Taskania</Navbar.Brand>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Поиск"
                            className="me-2"
                            aria-label="Search"
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
                <CDBSidebarHeader className="menu-name" prefix={<i className="fa fa-bars" maxWidth="200px" height="10px"/> }>
                </CDBSidebarHeader>
                <CDBSidebarMenu>
                    <CDBSidebarMenuItem className="menu-item" icon="th-large" >Список досок</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem className="menu-item" icon="th-list">Список задач</CDBSidebarMenuItem>
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