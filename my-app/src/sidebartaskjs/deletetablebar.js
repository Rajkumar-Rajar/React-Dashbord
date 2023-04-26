import React, { useEffect, useState } from 'react'
import Sidebar from './Sideb'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

// const element = <FontAwesomeIcon icon={faEnvelope} />

function Deletetablebar() {


    const location = useLocation()
    const { from } = location.state
    const [name, setname] = useState()
    const [id, setid] = useState()

    const Navigate = useNavigate()


    useEffect(() => {


        fetch(`https://63a96e89100b7737b991cd4b.mockapi.io/api/ap2/${from}`)
            .then((res) => res.json())
            .then((res) => {
                setname(res.firstName)
                setid(res.id)
            })
    }, [])



    const toomodify = () => {
        // toast("delete data")
        toast.success("change")

        //    setTimeout(()=>{
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(`https://63a96e89100b7737b991cd4b.mockapi.io/api/ap2/${id}`, requestOptions)
            .then((res) => res.json())
            .then(() => {
                window.location.reload(Navigate("/Tablesidebar"))
            })

        //    },2000)

        //
        // Navigate("/Tablesidebar")


    }


    return (
        <div style={{ display: "flex" }}>
            <div><Sidebar /></div>
            <div style={{ marginTop: "15%", marginLeft: "30%" }}>
                <div class="card " style={{ width: "170%" }}>
                    <div className="card-header text-uppercase">
                        <h4>delete data</h4>
                    </div>
                    <div class="card-body">

                        <div >
                            <div >
                                <h3>You want to delete</h3>
                            </div>
                            <div style={{ marginLeft: "40%" }}>
                                <div >
                                    <FontAwesomeIcon icon={icon.faCircleUser} style={{ height: "25%", width: "25%" }} />
                                </div>
                                <div>
                                    <b className='text-info text-uppercase' style={{ marginLeft: "7px" }}>{name}</b>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-success footer-right" onClick={() => (Navigate("/Tablesidebar"))}>cancel</button>
                        <button type="submit" className="btn btn-success float-right" onClick={() => toomodify()}>delete</button>

                    </div>
                </div>
            </div>
        <ToastContainer />
        </div >


       
    )
}

export default Deletetablebar
