import React, {useState, useContext, useEffect} from "react";
import "../EditModal.css"
import { UserContext } from "../UserContext";

import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'
import xicon from "../close.png"
const EditButtonModal = ({ isOpen, onClose, eventData }) => {
  const baseUrl = "http://127.0.0.1:5554"
  const eventUrl = baseUrl + "/events"
 
    const [editedEvent, setEditedEvent] = useState({
      title: eventData.title,
      description: eventData.description,
      datee: eventData.date,
      start_timee: eventData.start_time,
      location: eventData.location,
      image: eventData.image
      // Add other event attributes here
    });
     const [date, setDate] = useState(`${eventData.date} ${eventData.start_time}`)
    const { setEvent } = useContext(UserContext)
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value
      }));
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
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const formattedDates = formatDate(date);
      console.log(formattedDates.formattedDate)
        const response = await fetch(`${eventUrl}/${eventData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...editedEvent,
            date: formattedDates.formattedDate,
            start_time: formattedDates.formattedTime,
           
          })
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
             alert("Succesfully Updated")
          } else  {
            const errorData = await response.json();
            const errorMessage = errorData.error; 
            alert("Error updating event details: " + errorMessage); 
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };

      function convertToCustomFormat(inputDateString) {
      
        const inputDate = new Date(inputDateString);
      
   
        if (isNaN(inputDate.getTime())) {
          console.error('Invalid date');
          return null;
        }
      
    
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(inputDate.getDate()).padStart(2, '0');
        const hours = String(inputDate.getHours()).padStart(2, '0');
        const minutes = String(inputDate.getMinutes()).padStart(2, '0');
      
        
        const customFormatString = `${year}-${month}-${day}T${hours}:${minutes}`;
      
        return customFormatString;
      }
      const inputDateString = `${eventData.date} ${eventData.start_time}`
      function handleDateChange(newValue) {
        setDate(newValue)
        console.log('Date changed:', newValue);
      }
 


    
    
      useEffect(() => {
       
        const initialDateValue = dayjs(convertToCustomFormat(inputDateString));
        setDate(initialDateValue);
        handleDateChange(initialDateValue);
      }, []); 
      async function handleDelete() {
        // Display a confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this Event ??????');
    
        // If the user confirms, proceed with deletion
        if (confirmDelete) {
          try {
            const response = await fetch(`${eventUrl}/${eventData.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.ok) {
              console.log('Item deleted!');
              onClose();
              setEvent((prevEvents) => prevEvents.filter((event) => event.id !== eventData.id));
       
            } else {
              const errorData = await response.json();
              const errorMessage = errorData.error;
              alert('Error deleting event: ' + errorMessage);
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
        } else {
          // User canceled deletion
          console.log('Deletion canceled.');
        }
      }
    return (
        <div className={`modal-background ${isOpen ? "show" : ""}`}>

          <div className="edit-button-modal-content">
          <button1 onClick={onClose} className="cancel-button"> <img src={xicon}/></button1>
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
              <div  className="input-group3">
               
                 <DesktopDateTimePicker   label="Choose Date and Time" defaultValue={dayjs(convertToCustomFormat(inputDateString))} onChange={(newValue) => setDate(newValue) } />
                  
              </div>
            
             
              <button type="submit" className="Submit-Button">Save Changes</button>
            </form>
            <div className="deleteEvent"><p onClick={() => handleDelete()}>Delete this Event :)</p></div>
            
          </div>
        </div>
      );
    };
export default EditButtonModal;