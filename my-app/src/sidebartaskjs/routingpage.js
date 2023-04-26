import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom"
import Newtask from "./newtask";
import Addjs from "./addjs";
import Sidebar from "./Sideb";
import Tablesidebar from "./Tablesidebar";
// import Login from "./login";
import Login1 from "./Login";
import Edtetablesidebar from "./edtetablesidebar";
import Deletetablebar from "./deletetablebar";


function Routingpage() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login1 />} />
    <Route path="/Newtask" element={<Newtask />} />
    <Route path="/Tablesidebar" element={<Tablesidebar />} />
    <Route path="/Addjs" element={<Addjs />} />
    <Route path="/Edtetablesidebar" element={<Edtetablesidebar />} />
    <Route path="/Deletetablebar" element={<Deletetablebar />} />

    </Routes>
    </BrowserRouter>
  )
}

export default Routingpage
