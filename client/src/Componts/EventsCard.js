import React, {useState}from "react";
import "../index.css"
import Modal from "./Modal";
const EventsCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (event) => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
          <div className="card custom-card" onClick={toggleModal}>
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
    </div>
  )
};

export default EventsCard;