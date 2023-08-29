import React from "react";
import "../Modal.css"
const CommentCard = (props) =>{


   
   return (
    <div className="comment-box">
      <div className="comment-avatar">
        <img
          src="https://media.istockphoto.com/id/610003972/vector/vector-businessman-black-silhouette-isolated.jpg?s=612x612&w=0&k=20&c=Iu6j0zFZBkswfq8VLVW8XmTLLxTLM63bfvI6uXdkacM="
          alt="Avatar"
        />
      </div>
      <div className="comment-content">
        <div className="comment-info">
          <span className="comment-user">{props.user}</span>
          <span className="comment-date">{props.created_at}</span>
        </div>
        <div className="comment-text-container">
          <p className="comment-text">
            {props.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;