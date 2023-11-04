import React, {useState, useContext}from "react";
import "../index.css"
import Modal from "./Modal";
import { UserContext } from "../UserContext";
import EditButtonModal from "./EditButtonModal"; 
import "../event.css"
const EventsCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {currentUser,setCurrentUser} = useContext(UserContext)
  const [isEditButtonModalOpen, setIsEditButtonModalOpen] = useState(false);
  const { event } = useContext(UserContext)
  const { setEvent } = useContext(UserContext)
  const toggleModal = (event) => {
    setIsModalOpen(!isModalOpen);
  };
  const canEdit = props.user_Id === currentUser.id;
  const toggleEditButtonModal = (event) => {
    event.stopPropagation();
    setIsEditButtonModalOpen(!isEditButtonModalOpen);
  };
  const eventData = event.find(event => event.id === props.eKey);
    
  return (
    <div>
          <div className="card-custom-card" onClick={toggleModal}>
            <img src={props.image} className="card-img-top" alt={props.title} />
              <div className="card-body">
                  <h5 className="card-title">{props.title}</h5>
                     {/* <p className="card-description">{props.description}</p> */}
                     <div className="card-location">
          <strong>Location:</strong> {props.location}
        </div>
        <p className="card-user-id">
          <strong>EventHoster:</strong> {props.user_id}
        </p>

        {canEdit && <button onClick={toggleEditButtonModal}>edit</button>}
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