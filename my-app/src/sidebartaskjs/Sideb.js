import React, { useState } from 'react';
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../App.css"
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import Login from './addjs';
import Newtask from './newtask';
import { NavLink } from 'react-router-dom';
import Tablesidebar from './Tablesidebar';


const Sidebar = () => {

    return (<div >
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }} className="view overlay">
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader className='haverra'
                //  prefix={<i className="fa fa-bars fa-large" ></i>}
                >
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}  >
                        Sidebar
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/Newtask" activeClassName="activeClicked">
                            <span className='haverra'><CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem></span>
                        </NavLink>

                        <NavLink exact to="/Tablesidebar" activeClassName="activeClicked">
                            <span className='haverra'> <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem></span>

                        </NavLink>
                        {/* <NavLink exact to="/profile" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user" className='haverra'>Profile page</CDBSidebarMenuItem>
                        </NavLink> */}
                        {/* <NavLink exact to="/analytics" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line" className='haverra'>Analytics</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="exclamation-circle" className='haverra'>404 page</CDBSidebarMenuItem>
                        </NavLink> */}
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        Sidebar Footer
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    </div>);
};

export default Sidebar;