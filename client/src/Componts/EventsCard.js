import React, {useState, useContext}from "react";
import "../index.css"
import Modal from "./Modal";
import { UserContext } from "../UserContext";
import EditButtonModal from "./EditButtonModal"; 
import "../event.css"
import logo from "../sendicon.png"
import editLogo from "../edit.png"

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
  const eventData = event && event.find((event) => event && event.id === props.ekey);
    
  return (
    <div>
          <div className="card-custom-card" >
            <img src={props.image} className="card-img-top" onError={(e) => {
    e.target.src = "https://st2.depositphotos.com/2234823/8227/i/450/depositphotos_82277240-stock-photo-image.jpg"; 
    e.target.alt = "Fallback Image";
  }}/>
 {canEdit && (
        <img
          className="edit-button"
          src={editLogo}
          onClick={() => setIsEditButtonModalOpen(!isEditButtonModalOpen)}
          alt="Edit Button"
        />
      )}
              <div className="card-body">
                  <h5 className="card-title">{props.title}</h5>
                     {/* <p className="card-description">{props.description}</p> */}
                     <div className="card-location">
         <p><strong>Location:</strong> {props.location}</p> 
          <strong>Time: {props.start_time}</strong>
          <strong>Date: {props.date}</strong>
        </div>
        
    
      </div>
      <div className="card-user-id">
        <div className="TapButton"><button onClick={toggleModal} className="TapButton-Button">Tap For More Info</button></div>
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
        eKey={props.ekey}
        image={props.image}
        date={props.date}
        start_Time={props.start_time}
        location={props.location}


      />
       {event && eventData && isEditButtonModalOpen && (
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