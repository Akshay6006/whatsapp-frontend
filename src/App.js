// src/App.js
import React, { useState } from "react";
import ChatList from "./components/chatlist";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [selectedWaId, setSelectedWaId] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  const handleSelectChat = (waId, name) => {
    setSelectedWaId(waId);
    setSelectedName(name);
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#0b141a" }}>
      <div style={{ width: "30%", borderRight: "1px solid #2a2f32" }}>
        <ChatList
          onSelectChat={(waId) => {
            // We also need to pass the name here
            const selectedChat = window.chatListData?.find((c) => c._id === waId);
            handleSelectChat(waId, selectedChat?.name || "Unknown");
          }}
          selectedWaId={selectedWaId}
        />
      </div>
      <div style={{ flex: 1 }}>
        <ChatWindow waId={selectedWaId} name={selectedName} />
      </div>
    </div>
  );
}

export default App;
