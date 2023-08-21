import logo from './logo.svg';
import './App.css';
import NavBar from './Componts/NavBar';
import { useState } from 'react'
import Home from "./Componts/Home"
import LoginPage from "./Componts/LoginPage"
const baseurl = "http://127.0.0.1:5555"
const eventurl = baseurl + "/events"
function App() {
    const [events, setEvents]= useState([])
    const [currentUser, setCurrentUser] = useState(null)
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
        }
      })

    }

    const fetchEvents = () =>
       fetch(eventurl)
      .then(r => r.json())
      .then(console.log)
    return (
      <div classname="app">
        <NavBar  currentUser={currentUser}/>
        {
          currentUser ?
            <Home       />
            : <LoginPage  loginUser={loginUser}    />
        }
      </div>
        );
}

export default App;
