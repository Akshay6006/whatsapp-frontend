# 📱 WhatsApp Clone (Full Stack)

A full-stack WhatsApp Web-style chat application with:
- Backend (Node.js + Express + MongoDB + Mongoose)
- Frontend (React, Dark Mode UI)
- Postman API testing support

---

## 🚀 Features
- Real-time conversation list
- Send & receive messages
- Dark mode UI inspired by WhatsApp Web
- Contact management (add new contacts)
- REST API for integration & testing
- Sample payload sender for seeding chats

---

## 📂 Project Structure
whatsapp/
├── backend/ # Node.js + Express + MongoDB API
├── frontend/ # React app (WhatsApp Web style)
└── README.md # Project documentation

---

## 🛠️ Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/Akshay6006/whatsapp_clone
cd whatsapp


2️⃣ Backend Setup

cd backend
npm install
Create .env file inside backend:
env
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
PORT=5000
Start backend:
node server.js
Backend will run at http://localhost:5000.

3️⃣ Frontend Setup
cd ../frontend
npm install
npm start
Frontend will run at http://localhost:3000.

🧪 Postman Testing
1. Add a Contact
POST http://localhost:5000/add-contact


{
  "wa_id": "919876543210",
  "name": "Simu"
}
2. Send a Message (Outgoing)
POST http://localhost:5000/send


{
  "wa_id": "919876543210",
  "name": "You",
  "message": "Hi from Postman!"
}
3. Simulate Incoming Message
POST http://localhost:5000/webhook


{
  "wa_id": "919876543210",
  "name": "Simu",
  "message": "Hello! Got your message.",
  "direction": "in"
}


⚡ Notes
wa_id is the unique contact ID. You can get it via:

GET http://localhost:5000/conversations
Sample payloads are in backend/sample_payloads/
You can send them using:


node payload_sender.js
UI auto-refresh can be added for real-time chat.

👨‍💻 Author
Your Akshay Kumar
GitHub: https://github.com/Akshay6006
