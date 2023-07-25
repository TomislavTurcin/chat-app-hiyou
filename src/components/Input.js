import React, { useState } from "react";


const Input = ({ onSendMessage }) => {

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    onSendMessage(message); 
    setMessage(""); 
  };

  return (
    <div className="Input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Start your message here"
          value={message}
          onChange={handleChange} 
        />
        <button type="submit">Send</button> 
      </form>
    </div>
  );
};

export default Input;
