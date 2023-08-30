import React, {useContext} from "react";
import Events from "./Events";  
import NavBar from "./NavBar";
import { UserContext } from '../UserContext'
const Home = () => {
  const {currentUser,setCurrentUser} = useContext(UserContext)
    return (
      
        <div className="background-container">
          <NavBar  currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <div className="top-div">
          <div className="title">LETS GET IT STARTED</div>
          {/* <div className="line-break"></div> */}
          <div className="little-text">
            Start hosting and attending events today
          </div>
        </div>
  
        <div>
          
          <Events />
        </div>
      </div>
    );
  };
export default Home