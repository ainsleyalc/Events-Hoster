import React, {useEffect, useState, useContext} from 'react';
import "../Modal.css"
import CommentCard from './CommentCard';
import { UserContext } from '../UserContext';

  
  

const Modal = ({ isModalOpen, toggleModal, ...props}) => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([])
  const baseUrl = "http://127.0.0.1:5555"
  const commentsUrl = baseUrl + "/comments"
  const usersUrl = baseUrl + "/user"
  const [newComment, setNewComment] = useState({});
  const {currentUser,setCurrentUser} = useContext(UserContext)
  useEffect(() => {
    if (isModalOpen) {
      fetch(commentsUrl, { method: 'GET' })
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
        // document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';

      fetch(usersUrl, { method: 'GET' })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  }, [isModalOpen]);
    if (!isModalOpen) {
    return null;
  }
  const filterComments = () => {
    const filteredComments = comments.filter(comment => comment.event_id === props.eKey)
    return filteredComments
  };

  const grabUser = (id) =>{
    const user = users.filter(user => user.id === id)
    return user[0].name
  }

  
  const handleCommentChange = (event) => {
    const text = event.target.value
 
    
    setNewComment({
      user_id: currentUser.id,
      event_id: props.eKey,
      text : text
    });
    
  };

  const handleAddComment = () => {
    const postRequest = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(newComment),
    };



    fetch(commentsUrl, postRequest)
    .then(response => {
      if (response.status === 400) {
        return response.json(); // Return the error response
      } else {
        return response.json(); // Return the normal response
      }
    })
    .then(data => {
      if (data.error) {
        alert(data.error); // Display the error message to the user
      } else {
        console.log('Adding comment:', data);
        // Clear the input
        setNewComment({
          user_id: currentUser.id,
          event_id: props.eKey,
          text: '',
        });
      }
    })
    .catch(error => {
      console.error('Error adding comment:', error);
    });
};

  return (
    <div className="modal-overlay">
    <div className="modal-content">
      <span className="close" onClick={toggleModal}>
        &times;
      </span>
     
      <div className="content-containers">
        <div className="right-div">
          <img className="eventImage" src={props.image} alt={props.title} />
          
          <div className="title-des">
          <h2>{props.title}</h2>
          <p>Description: {props.description}</p>

        </div>
        
  
        </div>
        <div className="left-div">
         
     {filterComments().map(comment => (
            <CommentCard
              key={comment.id}
              eKey={props.eKey}
              created_at={comment.created_at} 
              text={comment.text}
              user={grabUser(comment.user_id)}
              
            />
          ))}

          
     
        </div>
        <div className="comment-input-container">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment.text}
            onChange={handleCommentChange}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  </div>
);
};


export default Modal;

  
  
  
  
  