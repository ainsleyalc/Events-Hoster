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
function Index() {
  const [currentUser, setCurrentUser] = useState(null);
  const [event, setEvent] = useState([])
  const [users, setUsers] = useState([])
  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser, event, setEvent, users, setUsers}}>
        <Routes>
          <Route path="/" element={<App />} />
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