import React, {useState, useContext} from "react";
import "../Modal2.css"
import { UserContext } from "../UserContext";
import { DatePicker } from '@mui/x-date-pickers';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'
import xicon from "../close.png"
const Modal2 = ({ isOpen, onClose }) => {
    const {currentUser,setCurrentUser} = useContext(UserContext)
    const baseurl = "http://127.0.0.1:5554"
    const [date, setDate] = useState("")
    const [editedEvent, setEditedEvent] = useState({
      title: "",
      description: "",
      location: "",
      image: "",
     
    
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
      const requiredFields = ["title", "description", "location"];
      const missingFields = requiredFields.filter(field => !editedEvent[field]);

      if (missingFields.length > 0) {
        alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
        return;
  }
      try {
        const formattedDates = formatDate(date);
        const user_id = currentUser ? currentUser.id : null;
    
        const response = await fetch(`${baseurl}/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editedEvent,
            date: formattedDates.formattedDate,
            start_time: formattedDates.formattedTime,
            user_id: user_id,
          }),
        });
    
        if (response.ok) {
          const updatedEventData = await response.json();
          
          setEvent((prevEvents) => prevEvents.map((event) => (event.id === updatedEventData.id ? updatedEventData : event)));
          setEditedEvent({
            title: "",
            description: "",
            location: "",
            image: "",
          }); 
          onClose();
          alert("Event details updated successfully!");
        } else {
          const errorData = await response.json();
          alert("Error updating event details: " + errorData.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    
    function formatDate(dateObject) {
      if (!dateObject || !dateObject.$d) {
        return null;
      }
    
      const formattedTime = new Intl.DateTimeFormat(dateObject.$L, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }).format(dateObject.$d);
    
      const formattedDate = new Intl.DateTimeFormat(dateObject.$L, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(dateObject.$d);
    
      return {
        formattedTime,
        formattedDate,
      };
    }
      return (
        isOpen ? (
          <div className="modal-background">
            <div className="edit-button-modal-content">
               <button1 onClick={onClose} className="cancel-button"> <img src={xicon}/></button1>
              <h2> New Event Details</h2>
       
             
              <form onSubmit={handleFormSubmit}>

              <div className="input-Group">
                <h1>Title</h1>
                  <label className="label">
              
                    <input
                      type="text"
                      name="title"
                      value={editedEvent.title}
                      onChange={handleInputChange}
                      placeholder="Title"
                    />
                  </label>
           
                          
                </div>
               
                 
                <div className="input-Group">
                    <h1>Description:</h1>
                  <label>
                  
                    <input
                      name="description"
                      value={editedEvent.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                    />
                  </label>
                </div>  

                <div className="input-Group">
                  <label>
                    <h1>Location:</h1>
                    <input
                      name="location"
                      value={editedEvent.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                    />
                  </label>
                </div>
                <div className="input-Group">
                  <label>
                  <h1> Image Link:</h1> 
                    <input
                      name="image"
                      value={editedEvent.image}
                      onChange={handleInputChange}
                      placeholder="Image"
                    />
                  </label>
                </div>                     <div  className="timeclicker">
                  
                    <DesktopDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} value={date} onChange={(newValue) => setDate(newValue)}/>
                  </div>
                <div>
                   <button type="submit" className="Submit-Button">ADD Event </button>
                </div>
               
              </form>
             
            </div>
          </div>
        ) : null
      );
    };
export default Modal2;