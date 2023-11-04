import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { UserContext } from './UserContext';
import ProfilePage from "./Componts/ProfilePage.js"
import NavBar from "./Componts/NavBar"
import Attending from './Componts/Attending';
import SignUpPage from './Componts/SignUpPage';
import LoginPage from "./Componts/LoginPage"
function Index() {
  const [currentUser, setCurrentUser] = useState(null);
  const [event, setEvent] = useState([])
  const [users, setUsers] = useState([])
  const baseurl = "http://127.0.0.1:5555"
  const eventurl = baseurl + "/events"
  const loginUser = (loginInfo) =>{
    
    const postRequest= {
      method: "POST",
      headers:{
      'content-type': "application/json",
      'accept':"application/json",
      },
      body: JSON.stringify( loginInfo )
    }
    fetch(baseurl + "/login", postRequest)
    .then(r => r.json())
    .then(user => {
      if (user === null) {
        alert("Something went wrong: Response is null");
      } else {
        setCurrentUser(user)
        console.log(user); 
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    })

  }
  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser, event, setEvent, users, setUsers}}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage loginUser={loginUser}/>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/profile"
            element={currentUser ?  <>
              <NavBar /> 
              <ProfilePage />
            </> : <Navigate to="/" />}
            
          />
           <Route
            path="/saved"
            element={currentUser ?  <>
              <NavBar /> 
              <Attending   />
            </> : <Navigate to="/" />}
            
          />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

// Use ReactDOM.createRoot to render your app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);