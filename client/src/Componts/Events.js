import React from  'react'
import "../event.css"
import EventsCard from './EventsCard';
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom'
const Events= () =>{
    const baseUrl = "http://3.15.1.45"
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
    console.log()



      return (
        <div className='event-listt'>
          {event.slice(-5).reverse().map((singleEvent) => (
    <EventsCard
      ekey={singleEvent.id}
      image={singleEvent.image}
      title={singleEvent.title}
      description={singleEvent.description}
      date={singleEvent.date}
      start_time={singleEvent.start_time} // adjusted to camelCase for start_time
      location={singleEvent.location}
      user_id={GrabOtherUser(singleEvent.user_id)}
      user_Id={singleEvent.user_id}
    />
  ))}
    </div>
      );
    };
    
      return (
        <div className="event-Div">
          <p1>Upcoming Events --</p1>
          {renderList()}
         
          <Link to="/listing" className="ViewButton2">View Events</Link>
        </div>
      );
    };
    
    export default Events;