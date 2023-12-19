import React, {useEffect, useState, useContext} from 'react';
import "../Modal.css"
import CommentCard from './CommentCard';
import { UserContext } from '../UserContext';
import logo from "../sendicon.png"
import sendicon from "../sendiconn.png"
  

const Modal = ({ isModalOpen, toggleModal, ...props}) => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([])
  const baseUrl = "http://127.0.0.1:5554"
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
        
        setComments((currentComment) =>{
          return [...currentComment, data]
        })


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
       <div className='Modal-Top-left'>
          <img src={props.image}/>
       </div>
       <div className='Modal-Top-Rightt'>
        <p>{props.title}</p>
        <p3>{props.description}</p3>
       </div>
      </div>  
      <div className='comment-Container'>
          <div className='comment-Box'>
          {filterComments().map(comment => (
            <CommentCard
              commentKey={comment.id}
              eKey={props.eKey}
              created_at={comment.created_at} 
              text={comment.text}
              user={grabUser(comment.user_id)}
              user_id={comment.user_id}
              comments = {comments}
              setComments = {setComments}
            />
          ))} 
          </div>
     </div>
     <div  >

      {currentUser ? ( <div className='comment-input-container'><input  placeholder='Write Here' className='comment-inputt'   value={newComment.text}
            onChange={handleCommentChange} type="text"/>  <button onClick={handleAddComment} className='send-Button'><img  src={sendicon}/></button></div>
        ) :<p >Sign in to comment</p>}
     
     </div>
     
    </div>
  
  </div>
);
};


export default Modal;

  
  
  
  
  