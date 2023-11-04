import React, {useContext} from "react";
import Events from "./Events";  
import NavBar from "./NavBar";
import { UserContext } from '../UserContext'
import "../index.css"
import logo from "../quoteLogo.png"
const Home = () => {
  const {currentUser,setCurrentUser} = useContext(UserContext)
    return (
      
        <div className="background-container">
          <NavBar  currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <div className="top-div">
          <div className="left-Top-Div">
            <p>Host And Attend Events Today</p>
            <h1>Effortlessly host and participate in events today with a simple click, all at no cost. Experience the convenience and formality of our event platform.</h1>
            <button  className="ViewButton">View Events</button>          
          </div>
          <div className="right-Top-Div">
            <img   src="https://seo.workstream.us/images/landing-job-desc.png"/>
          </div>
        </div>
        <div className="FeedBack-Div">
              <img src={logo} />
              <div className="Message-Container">
                  <box className="Quote-box">
                     <h1> "Hands down Best Event-Hoster on the Web, without it life would be 10x more difficult me and my team all use the app has a way to manage are events.Its very helpful how we have the ability to delete, update and create events  "</h1>
                     <p class="author">-- Dylan Bennet</p>
                  </box>
                  <box className="Quote-box"> 
                     <h1> "Really love this website came across it from the google search engine and ever since i fell in love. Even though it's a event Hoster i use it has a personal way to manage stuff around my house so that everyone can see it.  "</h1>
                     <p class="author">-- Ashley Alc</p></box>
              </div>
              <div className="Message-desc">
                    <p>At Event Hoster, our paramount mission is to ensure an atmosphere where each and every user experiences the utmost comfort and revels in the seamless interactivity of our meticulously crafted web platform. We are steadfastly dedicated to the creation of a user-friendly and inviting digital space, where every visitor finds a sense of belonging and can navigate with ease. Our unwavering commitment to excellence is evident in the careful design and development of our website, with a primary focus on user satisfaction. We are resolute in our pursuit of providing a hospitable online environment where visitors can forge memorable experiences and enjoy the full spectrum of our offerings. Join us at Event Hoster, where your enjoyment and satisfaction are our topmost priorities.</p>
                    <h1>--Ainsley Alceme</h1>
              </div>
        </div>
        <div>
          <Events />
        </div>
        <div className="Buttom-of-Page">

        </div>
      </div>
    );
  };
export default Home