// src/components/ChatWindow.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function ChatWindow({ waId, name }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Fetch messages for selected contact
  useEffect(() => {
    if (waId) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000); // auto-refresh
      return () => clearInterval(interval);
    }
  }, [waId]);

  const fetchMessages = async () => {
    if (!waId) return;
    try {
      const res = await axios.get(`${API_BASE}/messages/${waId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  // Send outgoing message
  const sendMessage = async () => {
    if (!input.trim() || !waId) return;
    try {
      await axios.post(`${API_BASE}/send`, {
        wa_id: waId,
        name: "You",
        message: input,
      });
      setInput("");
      fetchMessages();
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  // Quick reply (simulate incoming)
  const quickReply = async () => {
    try {
      await axios.post(`${API_BASE}/webhook`, {
        wa_id: waId,
        name: name || "Unknown",
        message: "This is a quick reply! ✅",
        direction: "in",
      });
      fetchMessages();
    } catch (err) {
      console.error("Error sending quick reply", err);
    }
  };

  if (!waId) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: "20px" }}>
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Chat header */}
      <div style={{ padding: "10px", backgroundColor: "#202c33", color: "#fff" }}>
        <strong>{name}</strong>
      </div>

      {/* Chat messages */}
      <div style={{ flex: 1, padding: "10px", overflowY: "auto", backgroundColor: "#111b21" }}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              textAlign: msg.direction === "out" ? "right" : "left",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "8px",
                backgroundColor: msg.direction === "out" ? "#005c4b" : "#202c33",
                color: "#fff",
              }}
            >
              {msg.message}
            </span>
          </div>
        ))}
      </div>

      {/* Typing box */}
      <div style={{ display: "flex", padding: "10px", backgroundColor: "#202c33" }}>
        <input
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            backgroundColor: "#2a3942",
            color: "#fff",
          }}
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "8px",
            padding: "10px 15px",
            backgroundColor: "#00a884",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
        <button
          onClick={quickReply}
          style={{
            marginLeft: "8px",
            padding: "10px 15px",
            backgroundColor: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Quick Reply
        </button>
      </div>
    </div>
  );
}
