import React from 'react'
import { Link } from 'react-router-dom';


const NavBar = ({ currentUser }) => {
    return (
      <div>
        <nav>
          <ul>
            {currentUser ? (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </>
            ) : (
              <li><Link to="/signup">Sign Up</Link></li>
            )}
          </ul>
        </nav>
      </div>
    );
  };
  
  export default NavBar;