import React, { useContext, useEffect, useState} from "react";
import "../listingPage.css"
import { UserContext } from "../UserContext";
import "../index.css"
import "../event.css"
import EventsCard from "./EventsCard";
import search from "../search.png"
import "../Modal.css"
const Listing = () =>{
    const baseUrl = "http://3.15.1.45"
    const eventUrl = baseUrl + "/events"
    const userUrl = baseUrl + "/user"
  
    const { event } = useContext(UserContext);
    const { setEvent } = useContext(UserContext);
    const { setUsers } = useContext(UserContext);
    const { users } = useContext(UserContext);
    const [title, setTitle ] = useState("")
    const [location, setLocation ] = useState("")
    const removeSpaces = (str) => str.replace(/\s/g, '');
    useEffect(() => {
   
     
      
      Promise.all([
        fetch(eventUrl).then(response => response.json()),
        fetch(userUrl).then(response => response.json())
      ])
        .then(([eventData, userData]) => {
          setEvent(eventData);
          setUsers(userData);
           console.log(event)
        })
        .catch(error => {
          console.error('An error occurred:', error);
    
        });
    }, []); 
    
    const GrabOtherUser = (id) =>{
      const otherUser = users.find(user => user.id === id);
      return otherUser.name;
    }
   
    const filteredEvents = event.filter((singleEvent) => (
        (!title || removeSpaces(singleEvent.title).toLowerCase().includes(removeSpaces(title).toLowerCase())) &&
        (!location || removeSpaces(singleEvent.location).toLowerCase().includes(removeSpaces(location).toLowerCase()))))
     
    const handleTitleChange = (e) => {
        // e.preventDefault();
       setTitle(e.target.value)
    }
    const handleLocationChange = (e) => {
        setLocation(e.target.value)
    }
    const renderList = () => {

      if (filteredEvents.length === 0) {
        return <p>Cant find or check search  </p>;
      }
  



      return (
        <>    {filteredEvents.map((singleEvent) => (
            
                <EventsCard
                
                ekey={singleEvent.id}
                image={singleEvent.image}
                title={singleEvent.title}
                description={singleEvent.description}
                date={singleEvent.date}
                start_time={singleEvent.start_time} 
                location={singleEvent.location}
                user_id={GrabOtherUser(singleEvent.user_id)}
                user_Id={singleEvent.user_id}
                />
                
  ))}</>
      
   
      );
    };
    return (
        <div  className="listing-container">
            <div  className="SearchContainer">
              <div  className="top-Search"> 
              <img  src={search}/>
              </div>
              <div className="buttom-Search">
                 <div className="input-group">
                  <label>
                  
                    <input
                      name="Title"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Title"
                    />
                  </label>
                </div>
               
                <div className="input-group2">
                  <label>
                  
                    <input
                      name="Location"
                      value={location}
                      onChange={handleLocationChange}
                      placeholder="Location"
                    />
                  </label>
                </div>
            </div></div>
           
            <div   className="events-container">
                {renderList()}
            </div>
        </div>
    );
};
export default Listing