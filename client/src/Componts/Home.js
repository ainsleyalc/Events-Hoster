import React from "react";
import Events from "./Events";  
const Home = () => {
    return (
        <div className="background-container">
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