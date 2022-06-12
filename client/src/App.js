import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'

import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} exact/>
        <Route path="/chats" element={<ChatPage />}/>
      </Routes>
    </div>
  );
}

export default App;