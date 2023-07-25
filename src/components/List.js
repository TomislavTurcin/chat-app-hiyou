import React, { useEffect, useRef } from 'react';
import Message from './Messages';

const List = ({ messages, currentMember }) => {
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <ul className="list-of-messages" ref={listRef}>
      <li>User: {currentMember.name}</li>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          currentMember={currentMember}
        />
      ))}
    </ul>
  );
};

export default List;
