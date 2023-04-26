import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {

const Navigate = useNavigate()
const[data,setdata]=useState()
const[email,setemail]=useState()
const[password,setpassword]=useState()
const[emailcorrect,setemailcorrect]=useState(false)

useEffect(()=>{
    fetch("https://63a96e89100b7737b991cd4b.mockapi.io/api/ap2")
    .then((res) =>res.json())
    .then(res =>{
        setdata(res)
        let email1=[]
        let passord1=[]
        for (var i=0; i < res.length;i++){
            email1.push(res[i].email)
            passord1.push(res[i].password)

        }
        // console.log(email1)
        // console.log(passord1)
        setemail(email1)
        setpassword(passord1)
    })
},[])
    const validate = values => {
        const errors = {};

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

        return errors;
      };
      const formik = useFormik({
        initialValues: {
          email: '',
          password: "",

        },
        validate,
        onSubmit: values =>{ 
            let number

            data.filter((i)=>{
               if( i.email == values.email){
                number = i.id
                console.log(email[number-1])
                console.log(data[number-1].email)
                console.log(password[number-1])
                console.log(data[number-1].password)
               }


               if(values.email == data[number-1].email && values.password == data[number-1].password){
                Navigate('Newtask')
            }
            else{
                // console.log("hiiiiiiiiiiiiiiiiiiiii")
                // console.log(values.email)
                // console.log(data[number-1].email)
                // console.log(values.password)
                // console.log(data[number-1].password)
                setemailcorrect(true)
            }

            })
        
            // for (var i=0;i< email.length;i++){
            //     if (values.email == email[i] && values.password == password[i]){
            //         Navigate("/Newtask")                    
            //     }
            // }
            
            
    }
      });
    return (
        <div>
            
            <div className="wrapper">
                <div className="form-wrapper">
                    <form onSubmit={formik.handleSubmit}>
                            <h1>LOGIN</h1>
                        <div className="email">
                            <label htmlFor="email">EMAIL</label>
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
                            <label htmlFor="password">PASSWORD</label>
                            <input
                                placeholder="Password"
                                type="password"
                                name="password"
                                id="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                            {formik.errors.password && formik.touched.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}
                            {emailcorrect  ? <div style={{ color: "red" }}>{"enter corect email and password"}</div> : null}

                        </div>

                        <div className="createAccount">
                            <button type="submit">LOGIN</button>
                            <small>Already Have an Account?</small>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login
