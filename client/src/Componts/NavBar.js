import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import '../NavBar.css'; 
import { UserContext } from '../UserContext'

const NavBar = () => {
  const {currentUser,setCurrentUser} = useContext(UserContext)
  const logoutUser =()=>{
      setCurrentUser(null)
      localStorage.removeItem('currentUser');
  }
  return (
    <div className="navbar">
      <nav>
        <ul>
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
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;