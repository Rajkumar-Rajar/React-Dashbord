import React, { useEffect, useState } from 'react'
// import "./App.css";
import { useFormik } from 'formik';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sideb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'




function Edtetablesidebar() {
  const location = useLocation()
  const Navigate=useNavigate()
  const { from } = location.state
  const [time, settime] = useState()
  const [fname1, setfname1] = useState()
  const [email11, setemail11] = useState()
  const [lname1, setlname1] = useState()
  const [gender1, setgender1] = useState()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  const [password1, setpassword1] = useState()
  const [time1, settime1] = useState()
  const [birthday1, setbirthday1] = useState()
  const [edite, setedite] = useState([])
  const [checked, setchecked] = useState('')
  const [checked1, setchecked1] = useState('')
  useEffect(() => {

    fetch(`https://63a96e89100b7737b991cd4b.mockapi.io/api/ap2/${from}`)
      .then((res) => res.json())
      .then((res) => {
        setfname1(res.firstName)
        setlname1(res.lastName)
        setemail11(res.email)
        setpassword1(res.password)
        setbirthday1(res.birthday)
        setgender1(res.gender)
         if (res.gender == "Male") {
          setchecked("checked")
        }
        else{
          setchecked1("checked")
        }
        settime1(res.time)
        console.log(res.birthday);

        setedite(res)
      })

    const interval = setInterval(() => settime(Date().toLocaleString()), 1000);

    return () => {
      clearInterval(interval);
    };



  }, []);

  // const notify = () => toast("Wow so easy!");

  const validate = values => {
    const errors = {};
    if (!fname1) {
      errors.firstName = ' * Required';
    };

    if (!lname1) {
      errors.lastName = ' * Required';
    };

    if (!email11) {
      errors.email = '* Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email11)) {
      errors.email = 'Invalid email address';
    }

    if (!password1) {
      errors.password = '* Required';
    } else if (password1.length > 10) {
      errors.password = 'enter the correct passord';
    }

    if (!gender1) {
      errors.gender = '* Required';
    }
    


    if (!birthday1) {
      errors.birthday = '* Required';
    }


    return errors;
  };
  const change = (e) => {
    setchecked1("")
    setchecked("checked")
    setgender1(e.target.value)
  }
  const change1 = (e) => {
    setchecked1("checked")
    setchecked("")
    setgender1(e.target.value)
  }
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      birthday: '',
    },
    validate,
    onSubmit: values => {
      const requestOptions = {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "firstName": fname1,
          "lastName": lname1,
          "email":email11,
          "password":password1,
          "gender": gender1,
          "birthday":birthday1,
          "time": time1
        })
      };
      fetch(`https://63a96e89100b7737b991cd4b.mockapi.io/api/ap2/${from}`, requestOptions)
        .then(response => response.json())

      // toast.success("success", { position: toast.POSITION.TOP_RIGHT }, { autoClose: 1000 })
      toast.success("change")
      // Navigate("/Tablesidebar")
      setTimeout(() => {
        Navigate("/Tablesidebar")
      }, 2000)
    }


  });



  return (
    <div style={{ display: "flex" }}>
      <div><Sidebar /></div>

      <div className="wrapper">

        <div className="form-wrapper">

          <form onSubmit={formik.handleSubmit}>
            <h1 className='' style={{color: "rgb(51,51,51)"}}>Edit Data</h1>
            <div className="firstName">
              <label htmlFor="firstName" className='fw-bold'>First Name</label>
              <input
                placeholder="First Name"
                type="text"
                name="firstName"
                id="firstName"
                onChange={(e) => setfname1(e.target.value)}
                onBlur={formik.handleBlur}
                value={fname1}
                className='form-control'
              />
              {formik.errors.firstName && formik.touched.firstName ? <div style={{ color: "red" }}>{formik.errors.firstName}</div> : null}
            </div>
            <div className="lastName">
              <label htmlFor="lastName" className='fw-bold'>Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                name="lastName"
                id="lastName"
                onChange={(e) => setlname1(e.target.value)}
                onBlur={formik.handleBlur}
                value={lname1}
                className='form-control'
              />
              {formik.errors.lastName && formik.touched.lastName ? <div style={{ color: "red" }} >{formik.errors.lastName}</div> : null}
            </div>
            <div className="email">
              <label htmlFor="email" className='fw-bold'>Email</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                onChange={(e) => setemail11(e.target.value)}
                onBlur={formik.handleBlur}
                value={email11}
                className='form-control'
              />
              {formik.errors.email && formik.touched.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}
            </div>
            <div className="password">
              <label htmlFor="password" className='fw-bold'>Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setpassword1(e.target.value)}
                onBlur={formik.handleBlur}
                value={password1}
                className='form-control'
              />
              {formik.errors.password && formik.touched.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}

            </div>

            <div >
              <label htmlFor="gender" className='fw-bold'>gender</label><br></br>
              <input type="radio" id="gender" value="Male" name="gender" className="radiobuttonchange"
                onBlur={formik.handleBlur}
                checked={checked}
                onChange={(e) => change(e)}
              /> Male
              <input type="radio" id="gender" value="Female" name="gender" className="radiobuttonchange"
                onBlur={formik.handleBlur}
                checked={checked1}
                onChange={(e) => change1(e)}
              /> Female
              {formik.errors.gender && formik.touched.gender ? <div style={{ color: "red" }}>{formik.errors.gender}</div> : null}

            </div>



            <div>
              <label htmlfor="birthday" className='fw-bold'>Birthday:</label>
              <input type="date" id="birthday" name="birthday"
                onChange={(e) => setbirthday1(e.target.value)}
                onBlur={formik.handleBlur}
                value={birthday1}
                className="birth form-control"
                />

              {formik.errors.birthday && formik.touched.birthday ? <div style={{ color: "red" }}>{formik.errors.birthday}</div> : null}

            </div>

            <div className="createAccount" >

             <button type="submit" onClick={() =>(Navigate("/Tablesidebar"))}>Cancel Data</button>
             <button type="submit">Edit Data</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
          {/* {time} */}
        </div>
      </div>

      <ToastContainer />
    </div >

  )
}


export default Edtetablesidebar