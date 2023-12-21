import React, {useContext} from "react";
import "../Modal.css"
import { UserContext } from "../UserContext";
const CommentCard = (props) =>{
  const {currentUser,setCurrentUser} = useContext(UserContext)
  const baseUrl = "http://3.15.1.45"
  const commentsUrl = baseUrl + "/comments"
  const deleteComment = () =>{
    fetch(commentsUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        comment_id: props.commentKey
      })
    })
    .then(response => {
      if (response.status === 400) {
        return response.json(); // Return the error response
      } else {
        return response.json(); // Return the normal response
      }
    })
    .then(data =>{
      props.setComments(prevComments => prevComments.filter(comment => comment.id !== props.commentKey))
      console.log(data); // Process the response data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
   return (
    <div className="comment-box">
      <div className="comment-avatar">
        <img
          src="https://media.istockphoto.com/id/610003972/vector/vector-businessman-black-silhouette-isolated.jpg?s=612x612&w=0&k=20&c=Iu6j0zFZBkswfq8VLVW8XmTLLxTLM63bfvI6uXdkacM="
          alt="Avatar"
        />
      </div>
      <div  className="comment-section">
        <p3>{props.user}</p3>
        <p4> {props.text}</p4>
        
      </div>
      <div className="Right-Side-Comment">
        <span className="comment-date">{props.created_at}</span>
        {currentUser ?(currentUser.id === props.user_id && (
        <button1 className="delete-button" onClick={deleteComment}>
          <img src="https://img.icons8.com/glyph-neue/64/delete--v1.png" alt="delete--v1" className="delete-icon" />
        </button1>
      )):null
        }
      </div>
    </div>
  );
};

export default CommentCard;