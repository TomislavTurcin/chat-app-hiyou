import React from "react";

const Message = ({ message, currentMember }) => {
  const { member, text } = message;
  const myMessage = member.id === currentMember.id;
  const className = myMessage ? "message currentMember" : "message";

  return (
    <li className={className}>
      <div className="author">
        <div className="name" style={{ color: member.clientData.color }}>
          {member.clientData.name}
        </div>
        <div className="text">{text}</div>
      </div>
    </li>
  );
};

export default Message;
