import React, {useContext, useState} from 'react'
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom'
import NavBar from "./NavBar"
import "../signUpPage.css"
import { Link } from 'react-router-dom';
const initialState = {
    name:"",
    username: '',
    password: '',
  };
const baseurl = "http://127.0.0.1:5554"

const SignUpPage = () => {
  const [formData, setFormData] = useState(initialState);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // useHistory to manage navigation
  const navigate = useNavigate();

  const signUpUser = (loginInfo) => {
    const postRequest = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    };
    fetch(baseurl + '/signup', postRequest)
    .then((r) => {
      if (!r.ok) {
        throw new Error('Signup request failed with status: ' + r.status);
      }
      return r.json();
    })
    .then((responseData) => {
      // Check if responseData contains an "error" field indicating a signup error
      if (responseData.error) {
        throw new Error('Signup failed: ' + responseData.error);
      }
  
      setCurrentUser(responseData);
      console.log(responseData);
  
      // Redirect to the login page after successful signup
      navigate('/');
    })
    .catch((error) => {
      console.error('An error occurred:', error);;
        alert('Signup failed: ' + error.message);
      })
  };


  const updateFormData = (e) => {
    const { name, value } = e.target;
    const changeFormData = { ...formData, [name]: value };
    setFormData(changeFormData);
  };

return (
    <div className="login-container">
      <div className="container">
      <div className='toploginbox'><h1>Sign up  </h1>
        <h2> To Sign up Please create a unique Username and Password</h2>
        </div>
        <div className='loginForm '>   <form
          onSubmit={(e) => {
            e.preventDefault();
            signUpUser(formData); 
            setFormData(initialState);
          }}
        >
         <div className="loginboxss">
          <div className='twin-inputs' >
              <div className="center-input">
                Name
                <br />
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={updateFormData}
                  name="name"
                />
              </div>
              <div className="center-input">
                Username
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
                Password
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={updateFormData}
                  name="password"
                />
              </div>
            
           
       



          </div>

          <div className="center-button">
              <button type="submit">Create User</button>

              <div className='signupLink'>   
               <Link to="/login" >
               Already have an account ?
              </Link>               
               <Link to="/" >
                Go back to home Page ?
              </Link></div>
            
        </div> 
</div>
      </form> </div>
     
    </div>
  </div>
);
        }  
export default SignUpPage;