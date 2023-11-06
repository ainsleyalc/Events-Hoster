import React, {useState, useContext}from "react";
import "../index.css"
import Modal from "./Modal";
import { UserContext } from "../UserContext";
import EditButtonModal from "./EditButtonModal"; 
import "../event.css"
import logo from "../sendicon.png"
const EventsCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {currentUser,setCurrentUser} = useContext(UserContext)
  const [isEditButtonModalOpen, setIsEditButtonModalOpen] = useState(false);
  const { event } = useContext(UserContext)
  const { setEvent } = useContext(UserContext)
  const toggleModal = (event) => {
    setIsModalOpen(!isModalOpen);
  };
  
  const canEdit = currentUser ? props.user_Id === currentUser.id : null;

  const toggleEditButtonModal = (event) => {
    event.stopPropagation();
    setIsEditButtonModalOpen(!isEditButtonModalOpen);
  };
  const eventData = event.find(event => event.id === props.eKey);
    
  return (
    <div>
          <div className="card-custom-card" >
            <img src={props.image} className="card-img-top" alt={props.title} />
              <div className="card-body">
                  <h5 className="card-title">{props.title}</h5>
                     {/* <p className="card-description">{props.description}</p> */}
                     <div className="card-location">
         <p><strong>Location:</strong> {props.location}</p> 
          <strong>Time:{props.start_Time}</strong>
        </div>
        
        {currentUser ? (
    canEdit && <button onClick={toggleEditButtonModal}>edit</button>
  ) : null}
      </div>
      <div className="card-user-id">
        <div className="TapButton"><button onClick={toggleModal}>Tap For More Info</button></div>
        <p>
          <strong>Event-Hoster:</strong> {props.user_id}
        </p>
      </div>

    </div>
      <Modal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        title={props.title}
        description={props.description}
        eKey={props.eKey}
        image={props.image}
        date={props.date}
        start_Time={props.start_Time}
        location={props.location}


      />
      {isEditButtonModalOpen && (
        <EditButtonModal
          isOpen={isEditButtonModalOpen}
          onClose={() => setIsEditButtonModalOpen(false)}
          eventData={eventData}
          
        />
      )}
    </div>
  )
};

export default EventsCard;