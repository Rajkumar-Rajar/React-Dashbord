import React, { useEffect, useState } from 'react'
// import "./App.css";
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sideb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Addjs() {

  const [time, settime] = useState()
  const [checkbox, setchechbox] = useState()
  const [birthday1, setbirthday1] = useState()
  const Navigate=useNavigate()
  useEffect(() => {

    const interval = setInterval(() => settime(Date().toLocaleString()), 1000);

    return () => {
      clearInterval(interval);


    };


  }, []);

  // const notify = () => toast("Wow so easy!");

  const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = ' * Required';
    };

    if (!values.lastName) {
      errors.lastName = ' * Required';
    };

    if (!values.email) {
      errors.email = '* Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = '* Required';
    } else if (values.password.length > 10) {
      errors.password = 'enter the correct passord';
    }

    if (!values.gender) {
      errors.gender = '* Required';
    }

    if (!values.birthday) {
      errors.birthday = '* Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: "",
      gender: "",
      birthday: "",
    },
    validate,
    onSubmit: values => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "firstName": values.firstName,
          "lastName": values.lastName,
          "email": values.email,
          "password": values.password,
          "gender": values.gender,
          "birthday": values.birthday,
          "time": time
        })
      };
      fetch('https://63a96e89100b7737b991cd4b.mockapi.io/api/ap2', requestOptions)
        .then(response => response.json())
     
        toast.success("success",{position:toast.POSITION.TOP_RIGHT},{autoClose:1000})
        setTimeout(()=>{
      //  window.location.reload();
       Navigate("/Tablesidebar")
       },2000)
       }

  });



  return (
    <div style={{display:"flex"}}>
      <div><Sidebar /></div>
     
      <div className="wrapper">
      
        <div className="form-wrapper">
          
          <form onSubmit={formik.handleSubmit}>
            <h1 className='' style={{color: "rgb(51,51,51)"}}>ADD DATA</h1>
            <div className="firstName">
              <label htmlFor="firstName" className='fw-bold'>First Name</label>
              <input
                placeholder="First Name"
                type="text"
                name="firstName"
                id="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

              />
              {formik.errors.password && formik.touched.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}

            </div>

            <div >
              <label htmlFor="gender" className='fw-bold'>gender</label><br></br>
              <input type="radio" id="gender" value="Male" name="gender" className="radiobuttonchange"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              /> Male
              <input type="radio" id="gender" value="Female" name="gender" className="radiobuttonchange"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              
                /> Female
              {formik.errors.gender && formik.touched.gender ? <div style={{ color: "red" }}>{formik.errors.gender}</div> : null}

            </div>
          


            <div>
              <label htmlfor="birthday" className='fw-bold'>Birthday:</label>
              <input type="date" id="birthday" name="birthday"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

                className="birth" />
              {formik.errors.birthday && formik.touched.birthday ? <div style={{ color: "red" }}>{formik.errors.birthday}</div> : null}

            </div>

            {/* <div>
              <input type="checkbox" id="scales"  name="scales" value="tamil"  />
                <label for="scales">tamil</label>
           
              <input type="checkbox" id="horns" name="horns" value="english" />
                <label for="horns">english</label>
            
              <input type="checkbox" id="horns" name="horns" value="hindhi"/>
                <label for="horns">hindhi</label>
            </div> */}
          




                    <div className="createAccount">
            <button type="submit">ADD DATA</button>
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

export default Addjs