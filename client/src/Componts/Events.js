import React from  'react'
import "../event.css"
import EventsCard from './EventsCard';
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../UserContext';
const Events= () =>{
    const baseUrl = "http://127.0.0.1:5554"
    const eventUrl = baseUrl + "/events"
    const userUrl = baseUrl + "/user"
  
    const { event } = useContext(UserContext);
    const { setEvent } = useContext(UserContext);
    const { setUsers } = useContext(UserContext);
    const { users } = useContext(UserContext);
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
    
    const renderList = () => {

      if (event.length === 0) {
        return <p>NO UP COMING EVENTS </p>;
      }
    console.log(event[0].id)



      return (
        <div className="event-list">
          {event.map((singleEvent) => (
            <EventsCard
              eKey={singleEvent.id}
              image={singleEvent.image}
              title={singleEvent.title}
              description={singleEvent.description}
              date={singleEvent.date}
              start_time={singleEvent.start_Time}
              location={singleEvent.location}
              user_id={GrabOtherUser(singleEvent.user_id)}
             
                  
                  />
          ))}
    </div>
      );
    };
    
      return (
        <div className="event-Div">
          <p1>Upcoming Events --</p1>
          {renderList()}
          <button>View All listings</button>
        </div>
      );
    };
    
    export default Events;