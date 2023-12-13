import React, {useContext} from "react";
import { UserContext } from "../UserContext";
import EventsCard from './EventsCard';
import "../index.css"
const ProfilePage = () =>{
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { event } = useContext(UserContext);
    const { setEvent } = useContext(UserContext);
    const { setUsers } = useContext(UserContext);
    const { users } = useContext(UserContext);
    const GrabOtherUser = (id) =>{
        const otherUser = users.find(user => user.id === id);
        return otherUser.name;
      }
    
    const renderList = () => {

        if (event.length === 0) {
          return <p>NO UP COMING EVENTS </p>;
        }
        
        const filteredEvents = event.filter(singleEvent => singleEvent.user_id === currentUser.id);
  
  
  
        return (
          <div className="event-list">
            {filteredEvents.map((singleEvent) => (
              <EventsCard
                ekey={singleEvent.id}
                image={singleEvent.image}
                title={singleEvent.title}
                description={singleEvent.description}
                date={singleEvent.date}
                start_time={singleEvent.start_Time}
                location={singleEvent.location}
                user_id={GrabOtherUser(singleEvent.user_id)}
                user_Id={singleEvent.user_id}
                    
                    />
            ))}
      </div>
        );
      };



    return (
        <div>
            
            <div>
                <h1>MY EVENTS:</h1>
                <div className="event-list">
                    {renderList()}
                </div>
            </div>
        </div>
        
    );
};
export default ProfilePage