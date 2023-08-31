import React, {useState, useContext} from "react";
import "../EditModal.css"
import { UserContext } from "../UserContext";
const EditButtonModal = ({ isOpen, onClose, eventData }) => {
    const [editedEvent, setEditedEvent] = useState({
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      start_time: eventData.start_time,
      location: eventData.location,
      image: eventData.image
      // Add other event attributes here
    });
    const { setEvent } = useContext(UserContext)
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value
      }));
    };
  
    const handleFormSubmit = async (e) => {
        e.preventDefault();
      
        const response = await fetch(`/events/${eventData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedEvent)
        });
      
        try {
          if (response.ok) {
            const updatedEventData = await response.json();
            console.log(updatedEventData);
      
            setEvent((prevEvents) => {
              const updatedEvents = prevEvents.map((event) =>
                event.id === updatedEventData.id ? updatedEventData : event
              );
              return updatedEvents;
            });
      
            onClose(); // Close the modal
          } else  {
            const errorData = await response.json();
            const errorMessage = errorData.error; 
            alert("Error updating event details: " + errorMessage); 
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
  
    return (
        <div className={`modal-background ${isOpen ? "show" : ""}`}>
          <div className="edit-button-modal-content">
            <h2>Edit Event Details</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="input-group">
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={editedEvent.title}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Description:
                  <input
                    name="description"
                    value={editedEvent.description}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Date:
                  <input
                    name="date"
                    value={editedEvent.date}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Start Time:
                  <input
                    name="start_time"
                    value={editedEvent.start_time}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Location:
                  <input
                    name="location"
                    value={editedEvent.location}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Image:
                  <input
                    name="image"
                    value={editedEvent.image}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
             
              <button type="submit" >Save Changes</button>
            </form>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      );
    };
export default EditButtonModal;