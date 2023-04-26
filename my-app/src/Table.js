import React from 'react'
import { BrowserRouter } from "react-router-dom";
import  Tableb from './sidebartaskjs/Sideb';
import Tablebb from './Tablebb';
import { Routes, Route,Link  } from "react-router-dom"



function Table() {

    
    return (
        <div>

            {/* <Link to="/tableb">lll</Link> */}

            <div>
                <Routes>
                    <Route path="/" element={<Tableb />} />
                    <Route path="Tablebb" element={<Tablebb />} />
                </Routes>
            </div>
        </div>
    )
}

export default Table