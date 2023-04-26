/*eslint-disable*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom"

import Appj from "./Appj"
// import Login from "./sidebartaskjs/addjs";
import App1 from './Appj1';
// import Tablejs from './Tablejs';
// import Table from './Table';
import Edtetablesidebar from './sidebartaskjs/edtetablesidebar';
import Addjs from './sidebartaskjs/addjs';
// import Tableb from './sidebartaskjs/Sideb';
// import Newtask from './sidebartaskjs/newtask';
// import Sidebar from './sidebartaskjs/Sideb';
import Tablesidebar from './sidebartaskjs/Tablesidebar';
import Routingpage from './sidebartaskjs/routingpage';
import Loginpage from './Roughworks/loginpage';
import Dataaddin from './Roughworks/dataAddin';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Routingpage />
        // <Loginpage />
        // <Dataaddin />
);





