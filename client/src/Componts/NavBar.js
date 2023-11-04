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
    const handleLoginClick = () => {
      window.location.href = '/login'; // Replace with the desired URL
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
          </ul> 
        </div>
        <div className='rightNav'>
            {currentUser ? (
               <button onClick={logoutUser} >Logout</button>
            ) : (
              <div className='buttonDiv' > 
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleSignupClick}>Signup</button>
              </div>
             
            )}
        </div>
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <button onClick={logoutUser}>Logout</button>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/saved">saved</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/">Log In</Link>
              </li>
            </>
          )}
        </ul> */}
  
    </div>
  );
};

export default NavBar;