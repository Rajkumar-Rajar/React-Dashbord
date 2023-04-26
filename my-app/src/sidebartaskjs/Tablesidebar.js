/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "./addjs";
import Sidebar from "./Sideb";
// import "./App.css"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'
import { Pagination } from "antd"
function Tablesidebar() {

  const [table, settable] = useState([])
  const [tableicon, settableicon] = useState(icon.faSort)

  const [searchname, setsearchname] = useState([])
  const [search, setsearch] = useState("")
  const [debounce_search, set_debounce_search] = useState("")
  const [check, setcheck] = useState()
  const [name, setname] = useState("filter")

  const [current_page, setcurrent_page] = useState(1)
  const [post_perpage, setpost_perpage] = useState(5)


  const [delete_name, setdelete_name] = useState("")
  const [delete_id, setdelete_id] = useState("")


  let total_page = table.length
  const npage = Math.ceil(total_page / post_perpage)

  const lastPostIndex = current_page * post_perpage;
  const firstPostIndex = lastPostIndex - post_perpage;

  let list = []
  for (var i = 0; i < npage; i++) {
    list.push(i)
  }


  useEffect(() => {
    fetch("https://63a96e89100b7737b991cd4b.mockapi.io/api/ap2")
      .then((res) => res.json())
      .then((cal) => {
        let number = 0
        for (var i = 0; i < cal.length; i++) {
          number = number + 1
        }
        setcheck(number)
        settable(cal)
      })
  }, []);
  // ========================================================================================================================================
  useEffect(() => {
    const getData = setTimeout(() => {
      set_debounce_search(search)
    }, 2000)

    return () => clearTimeout(getData)
  }, [search])

  // =============================================================================================================================================
  // =============================================================================================================================================
  const toomodify = (idNum) => {
    toast.success("change")


    setTimeout(()=>{
      const requestOptions = {
        method: 'DELETE',
      };
      fetch(`https://63a96e89100b7737b991cd4b.mockapi.io/api/ap2/${idNum}`, requestOptions)
        .then((res) => res.json())
        .then(() => {
          window.location.reload(true)
          
        })

    },[2000])


  }




  // =============================================================================================================================================

  const searching = (e) => {
    setname(e)
    setsearch(e)
    // console.log(e)

  }
  const filtersearch = (e) => {
    setname("filter")
    setsearch(e.target.value)

  }


  const sorticon = () => {

    if (tableicon === icon.faSort) {
      let g = table.sort((a, b) => a.firstName.localeCompare(b.firstName));
      settable(g)
      settableicon(icon.faSortUp)
    }
    else if (tableicon === icon.faSortUp) {
      let g = table.sort((a, b) => a.firstName.localeCompare(b.firstName)).reverse();
      settable(g)
      settableicon(icon.faSortDown)



    }
    else {
      fetch("https://63a96e89100b7737b991cd4b.mockapi.io/api/ap2")
        .then((res) => res.json())
        .then((cal) => settable(cal))
      settableicon(icon.faSort)

    }
  }


  return (

    <div className="d-flex" >
      <div ><Sidebar /></div>
      <div className="col-sm card w-100">
        <div className="card-header">
          <div className="text-center">

            <h2 className="d-inline" style={{ color: "rgb(51,51,51)" }}>Employee Data</h2>
            <Link to="/Addjs" className="d-inline float-end"><button type="button" class="btn btn-outline-success" style={{ backgroundColor: "" }}> Create User</button></Link>

          </div>
        </div>
        <div className="card-body " >
          <div className="col-sm-12">
            {/* <Link to="/Addjs" ><button type="button" class="btn btn-outline-secondary"> Create User</button></Link> */}

            {check &&
              <div>
                <div className="mb-2">

                  <div className="d-flex justify-content-between">
                    {/* ========================================================filter dropdown filter============================================ */}
                    <div class="dropdown">
                      <button class="btn btn-outline-secondary border border-dark dropdown-toggle px-5 py-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {name}
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {
                          table.map((searchid) =>
                            <a class="dropdown-item" onClick={() => { searching(searchid.firstName) }}>{searchid.firstName}</a>

                          )
                        }
                      </div>
                    </div>
                    {/* =====================================================filter dropdown filter====================================================== */}
                    <div className="">
                      <input type="search" id="site-search" className="border border-dark" placeholder="search here.." onChange={(e) => filtersearch(e)} />

                      {/* <div class="spinner-border text-info"  role="status">
                      </div> */}

                    </div>
                  </div>

                </div>
                <div className="table-responsive-sm" style={{ height: "650px", display: "block", overflow: "scroll" }}>
                  <table className="table table-hover " >
                    <thead style={{ backgroundColor: "rgb(51,51,51)", color: "white" }}>
                      <tr>
                        <td width="200px">ID</td>
                        <td width="200px">FIRSTNAME <span className="ms-5 " onClick={sorticon}><FontAwesomeIcon icon={tableicon} /></span></td>
                        <td width="200px">GENDER</td>
                        <td >BIRTHDAY</td>
                        <td >EMAIL</td>
                        <td >PASSWORD</td>
                        <td ><center>EDIT/DELETE</center></td>
                      </tr>
                    </thead>
                    {
                      table.slice(firstPostIndex, lastPostIndex).filter((search1) =>
                        // search1.id.toLowerCase().includes(search) ||
                        search1.firstName.toLowerCase().includes(debounce_search) ||
                        search1.gender.includes(debounce_search) ||
                        search1.birthday.toLowerCase().includes(debounce_search) ||
                        search1.email.toLowerCase().includes(debounce_search) ||
                        search1.password.toLowerCase().includes(debounce_search)
                      ).map((i, id1) =>

                        <tbody >
                          <tr key={id1}>
                            <td>{i.id}</td>
                            {/* <td>{id1 + 1}</td> */}
                            <td>{i.firstName} </td>
                            <td>{i.gender}</td>
                            <td>{i.birthday}</td>
                            <td>{i.email}</td>
                            <td>{i.password}</td>
                            {/* ===============================================================dorp --------------------------------------------- */}
                            <td>
                              <center>
                                <div class="btn-group dropleft">
                                  <span className="row d-flex justify-content-center" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true">
                                    <FontAwesomeIcon icon={icon.faEllipsisVertical} />
                                  </span>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link to="/Edtetablesidebar" style={{ textDecoration: "none" }} state={{ from: i.id }}>
                                      <button class="dropdown-item" >Edit</button></Link>
                                    {/* <Link to="/Deletetablebar" style={{ textDecoration: "none" }} state={{ from: i.id }}>
                                  <button class="dropdown-item">Delete</button></Link> */}

                                    <button class="dropdown-item" onClick={() => { setdelete_id(i.id), setdelete_name(i.firstName) }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </center>
                            </td>
                            {/* ===============================================================dorp --------------------------------------------- */}
                          </tr>

                        </tbody>
                      )}
                  </table>
                </div>
              </div>
            }

            {!check &&
              <div>
                <h1 className="" style={{color: "rgb(51,51,51)"}}>ADD DATA</h1>
                <Link to="/Addjs">
                  <button style={{ marginLeft: "47%" }} type="button" class="btn btn-outline-success">Create User</button>
                </Link>
              </div>}
          </div>
        </div>

        <div className="card-footer">
          {/* =================================================================================================================================================== */}
          <div className="d-flex justify-content-between">
            <div class="btn-group dropup ms-2">
              <button type="button" class="btn border-info rounded-pill" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                show <b>{post_perpage}</b> data of <b>{table.length}</b> data <FontAwesomeIcon icon={icon.faSort} />
              </button>
              <div class="dropdown-menu dropdown-menu-dark">
                <a class="dropdown-item" onClick={() => { setpost_perpage(5); setcurrent_page(1) }} >5</a>
                <a class="dropdown-item" onClick={() => { setpost_perpage(10); setcurrent_page(1) }}>10</a>
                <a class="dropdown-item" onClick={() => { setpost_perpage(table.length); setcurrent_page(1) }}>all</a>
                {/* <input type='number' class="dropdown-item" onChange={(e)=>setpost_perpage(e.target.value)} /> */}
              </div>
            </div>



            <nav aria-label="..." className="me-5">

              <ul class="pagination rounded-pill">
                <li className={(current_page == 1) ? "page-item disabled" : null}>
                  <span class="page-link" onClick={() => { setcurrent_page(current_page - 1) }}>Previous</span>
                </li>
                {list.map((id, index) =>
                  <li key={index} className={(current_page == index + 1) ? "page-item active" : null}>
                    <a class="page-link " onClick={() => { setcurrent_page(index + 1) }} >{index + 1}</a>
                  </li>
                )}
                <li className={(current_page == list.length) ? "page-item disabled" : null}>
                  <span class="page-link" onClick={() => { setcurrent_page(current_page + 1) }}>Next</span>
                </li>
              </ul>

              {/* <Pagination 
              onChange={(value) => setcurrent_page(value)}
              pageSize={post_perpage}
              total={total_page}
              current={current_page}
              /> */}

            </nav>


          </div>
          {/* =================================================================================================================================================== */}
        </div>
      </div>
      {/* ============================================================delete-data==================================================== */}


      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">You want to delete</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div style={{ marginLeft: "40%" }}>
                <div >
                  <FontAwesomeIcon icon={icon.faCircleUser} style={{ height: "25%", width: "25%" }} />
                </div>
                <div>
                  <b className='text-info text-uppercase' style={{ marginLeft: "7px" }}>{delete_name}</b>
                </div>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={() => toomodify(delete_id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {/* ============================================================delete-data==================================================== */}
     

    </div>

  )
}

export default Tablesidebar

