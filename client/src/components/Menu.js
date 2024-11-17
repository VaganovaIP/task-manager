import {CDBSidebar, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from "cdbreact";

const Menu=()=>{
    return (
        <div className="navigation">
            <CDBSidebar textColor="#FFFFFF" backgroundColor="#455AA0" maxWidth="200px">
                <CDBSidebarHeader className="menu-name" prefix={<i className="fa fa-bars" maxWidth="200px" height="10px"/> }>
                </CDBSidebarHeader>
                <CDBSidebarMenu>
                    <CDBSidebarMenuItem className="menu-item" icon="th-large" >Dashboard</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem className="menu-item" icon="sticky-note">Components</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem className="menu-item" icon="chart-line" iconType="solid">
                        Metrics
                    </CDBSidebarMenuItem>
                </CDBSidebarMenu>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{padding: '10px 5px'}}
                    >
                        Sidebar Footer
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    )
}