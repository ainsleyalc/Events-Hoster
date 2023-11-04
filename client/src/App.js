import React, {useContext , useEffect} from "react"
import logo from './logo.svg';
import './App.css';
import NavBar from './Componts/NavBar';
import { useState } from 'react'
import Home from "./Componts/Home"
import LoginPage from "./Componts/LoginPage"
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
const baseurl = "http://127.0.0.1:5555"
const eventurl = baseurl + "/events"
function App() {
    const [events, setEvents]= useState([])
    // const [currentUser, setCurrentUser] = useState(null)
    const {currentUser,setCurrentUser} = useContext(UserContext)
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

    const navigate = useNavigate();
    useEffect(() => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        // Optionally navigate to a certain route if needed
        navigate('/'); // Redirect to the home page
      }
    }, []);
    return (
      <div classname="body">
        {/* <NavBar  currentUser={currentUser} setCurrentUser={setCurrentUser}/> */}
          <Home       />
      </div>
        );
}

export default App;
