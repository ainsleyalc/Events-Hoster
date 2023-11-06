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
        <h2>LOGIN</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser(formData);
            setFormData(initialState);
          }}
        >
          <div className="loginboxs">
            <div className="center-input">
              USERNAME
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
              PASSWORD
              <br />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={updateFormData}
                name="password"
              />
            </div>
            <div className="center-button">
              <button type="submit">LOGIN</button>
              <br />
              or
              <br />
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;