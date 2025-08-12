// src/components/ChatList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import CONFIG from "../config"; // Import API base from config

export default function ChatList({ onSelectChat, selectedWaId }) {
  const [conversations, setConversations] = useState([]);
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newWaId, setNewWaId] = useState("");

  const API_BASE = CONFIG.API_BASE;

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${API_BASE}/conversations`);
      setConversations(res.data);
      window.chatListData = res.data; // Save globally for App.js
    } catch (err) {
      console.error("Error fetching conversations", err);
    }
  };

  const handleNewChat = async () => {
    if (!newName || !newWaId) return alert("Please enter both name and number");
    try {
      await axios.post(`${API_BASE}/add-contact`, {
        wa_id: newWaId,
        name: newName,
      });
      setShowNewChatForm(false);
      setNewName("");
      setNewWaId("");
      fetchConversations();
    } catch (err) {
      console.error("Error adding contact", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#111b21", color: "white", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", borderBottom: "1px solid #2a2f32", display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>Chats</h3>
        <button
          onClick={() => setShowNewChatForm(!showNewChatForm)}
          style={{
            backgroundColor: "#00a884",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          + New Chat
        </button>
      </div>

      {showNewChatForm && (
        <div style={{ padding: "10px", borderBottom: "1px solid #2a2f32" }}>
          <input
            type="text"
            placeholder="Contact Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ width: "100%", padding: "5px", marginBottom: "5px" }}
          />
          <input
            type="text"
            placeholder="Contact Number (wa_id)"
            value={newWaId}
            onChange={(e) => setNewWaId(e.target.value)}
            style={{ width: "100%", padding: "5px", marginBottom: "5px" }}
          />
          <button
            onClick={handleNewChat}
            style={{
              backgroundColor: "#00a884",
              color: "white",
              border: "none",
              padding: "5px",
              width: "100%",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Save
          </button>
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto" }}>
        {conversations.map((c) => (
          <div
            key={c._id}
            onClick={() => onSelectChat(c._id)}
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: selectedWaId === c._id ? "#2a3942" : "transparent",
              borderBottom: "1px solid #2a2f32",
            }}
          >
            <strong>{c.name}</strong>
            <div style={{ fontSize: "12px", color: "#aebac1" }}>{c.lastMessage}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
