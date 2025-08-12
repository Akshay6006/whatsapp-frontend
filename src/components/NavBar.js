import React from 'react';

export default function NavBar({ setView }) {
  return (
    <div className="navbar">
      <button onClick={() => setView('chats')}>Chats</button>
      <button onClick={() => setView('status')}>Status</button>
      <button onClick={() => setView('calls')}>Calls</button>
    </div>
  );
}
