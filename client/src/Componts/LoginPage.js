import React from 'react'
import { useState } from 'react'
import  {useContext} from "react";
// import {useFormik} from "formik"
// import * from "yup"
import "../loginPage.css"
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom'

const initialState = {
  username: '',
  password: '',
};

const Login = ({ loginUser }) => {
  const [formData, setFormData] = useState(initialState);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const updateFormData = (e) => {
    const { name, value } = e.target;
    const changeFormData = { ...formData, [name]: value };
    setFormData(changeFormData);
  };

  // If the user is already logged in, redirect to the home page
  if (currentUser) {
    navigate('/');
  }

  return (
    <div className="login-container">
      <div className="container">
        <div className='toploginbox'><h1>Login </h1>
        <h2> Sign in with your Username and password</h2>
        </div>
        <div className='loginForm '>
         <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser(formData);
            setFormData(initialState);
          }}
        >
          <div className="loginboxss">
            <div className="center-input">
             <p1>Your Username</p1>
              <br />
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={updateFormData}
                name="username"
              />
            </div>
            <div className="center-input">
              Your Password
              <br />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={updateFormData}
                name="password"
              />
            </div>
            <Link>Forgot Password</Link>
            <div className="center-button">
              <button type="submit">LOGIN</button>

              <div className='signupLink'>   
               <Link to="/signup" >
                Don't have an Account ?
              </Link>               
               <Link to="/" >
                Go back to home Page ?
              </Link></div>
            
              {/* <br />
              or
              <br />
            */}
            </div> 
          </div> 
        </form>
        </div>

      </div> 
    </div>
  );
};

export default Login;