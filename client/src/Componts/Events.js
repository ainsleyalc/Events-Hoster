import React from  'react'

import EventsCard from './EventsCard';
import {useState, useEffect} from 'react'
const Events= () =>{
    const baseUrl = "http://127.0.0.1:5555"
    const eventUrl = baseUrl + "/events"
    const userUrl = baseUrl + "/user"
    const [event, setEvent] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
   
  
      
      Promise.all([
        fetch(eventUrl).then(response => response.json()),
        fetch(userUrl).then(response => response.json())
      ])
        .then(([eventData, userData]) => {
          setEvent(eventData);
          setUsers(userData);
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
        return <p>Loading...</p>;
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
        <div className="">
          {renderList()}
        </div>
      );
    };
    
    export default Events;