import React, { useContext } from 'react'
import { Link,  } from 'react-router-dom';
import '../NavBar.css'; 
import { UserContext } from '../UserContext'
import logo from "../logo512.png"

const NavBar = () => {
  const {currentUser,setCurrentUser} = useContext(UserContext)

  const logoutUser =()=>{
      setCurrentUser(null)
      localStorage.removeItem('currentUser');
  }
 
    const handleSignupClick = () => {
      window.location.href = '/signup'; // Replace with the desired URL
    };
 
  
  return (
    <div className="navbar">
        <div className='leftNav'>
         <img src={logo}/>
         <p>EVENT HOSTER</p>
        </div>
        <div className='middleNav'>
          <ul>
            <li>
              <p>
                <Link to="/" className="custom-link">Home</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="/profile" className="custom-link">Profile</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="/saved" className="custom-link">saved</Link>
              </p>
            </li>
            <li>
              <p>
                <Link to="/listing" className="custom-link">Listing</Link>
              </p>
            </li>
          </ul> 
        </div>
        <div className='rightNav'> 
            {currentUser ? (
              <div className='rightNav-rightNav'> <p>{currentUser.username}</p> <button onClick={logoutUser} >Logout</button></div>
               
            ) : (
              <div className='buttonDiv' > 
                <Link to="/login" className="custom-link"><button>Login</button></Link>
                <Link to="/signup" className="custom-link"><button>Signup</button></Link>
                
              </div>
             
            )}
        </div>
      
  
    </div>
  );
};

export default NavBar;