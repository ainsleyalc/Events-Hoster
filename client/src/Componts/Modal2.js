import React, {useState, useContext} from "react";
import "../Modal2.css"
import { UserContext } from "../UserContext";
const Modal2 = ({ isOpen, onClose }) => {
    const {currentUser,setCurrentUser} = useContext(UserContext)
 
    const [editedEvent, setEditedEvent] = useState({
      title: "",
      description: "",
      date: "",
      start_time: "",
      location: "",
      image: "",
      user_id: currentUser ? currentUser.id : 1
    
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
        // e.preventDefault();
      
        const response = await fetch(`/events`, {
          method: "POST",
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
      
            onClose(); 
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
        isOpen ? (
          <div className="modal-background">
            <div className="edit-button-modal-content">
              <h2> New Event Details</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="input-group">
                  <label>
                Title
                    <input
                      type="text"
                      name="title"
                      value={editedEvent.title}
                      onChange={handleInputChange}
                      placeholder="Title"
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
                      placeholder="Description"
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
                      placeholder="Date"
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
                      placeholder="Start Time"
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
                      placeholder="Location"
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
                      placeholder="Image"
                    />
                  </label>
                </div>
    
                <button type="submit">Save Changes</button>
              </form>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        ) : null
      );
    };
export default Modal2;