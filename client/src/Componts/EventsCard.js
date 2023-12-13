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
  const eventData = event.find(event => event.id === props.ekey);
    
  return (
    <div>
          <div className="card-custom-card" >
            <img src={props.image} className="card-img-top" alt={props.title} />
            {currentUser && props.user_Id === currentUser.id && (
              <img className="edit-button" src={editLogo} onClick={setIsEditButtonModalOpen} />
            )}
            
              <div className="card-body">
                  <h5 className="card-title">{props.title}</h5>
                     {/* <p className="card-description">{props.description}</p> */}
                     <div className="card-location">
         <p><strong>Location:{console.log(props.user_Id)}</strong> {props.location}</p> 
          <strong>Time:{props.start_Time}</strong>
        </div>
        
    
      </div>
      <div className="card-user-id">
        <div className="TapButton"><button onClick={toggleModal} className="TapButton-Button">Tap For More Info</button></div>
        <p>
          <strong>Event-Hoster:</strong> {props.user_id}

        </p>
      </div>
                {console.log(props.start_time)}
    </div>
      <Modal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        title={props.title}
        description={props.description}
        eKey={props.eKey}
        image={props.image}
        date={props.date}
        start_Time={props.start_time}
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