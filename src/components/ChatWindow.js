// src/components/ChatWindow.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CONFIG from "../config"; // Import API base

export default function ChatWindow({ selectedWaId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const API_BASE = CONFIG.API_BASE;

  useEffect(() => {
    if (selectedWaId) {
      fetchMessages();
    }
  }, [selectedWaId]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/messages/${selectedWaId}`);
      setMessages(res.data);
      scrollToBottom();
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(`${API_BASE}/send-message`, {
        wa_id: selectedWaId,
        text: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#0b141a", color: "white" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.fromMe ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                backgroundColor: msg.fromMe ? "#005c4b" : "#202c33",
                padding: "8px 12px",
                borderRadius: "7px",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #2a2f32" }}>
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
            marginRight: "10px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#00a884",
            border: "none",
            padding: "10px 15px",
            borderRadius: "50%",
            cursor: "pointer",
            color: "white",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
