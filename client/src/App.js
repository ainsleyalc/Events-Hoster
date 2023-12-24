import React, {useContext , useEffect} from "react"
import logo from './logo.svg';
import './App.css';
import NavBar from './Componts/NavBar';
import { useState } from 'react'
import Home from "./Componts/Home"
import LoginPage from "./Componts/LoginPage"
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'
const baseurl = "http://3.15.1.45"
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
       
        navigate('/'); 
      }
    }, []);
    return (
      
      <div classname="body">

   <LocalizationProvider dateAdapter={AdapterDayjs}>
    
        <Home       />
    </LocalizationProvider>

       
      </div>
        );
}

export default App;
