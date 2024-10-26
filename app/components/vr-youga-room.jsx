"use client"

import { useState } from "react"
import { FaMicrophone, FaMicrophoneSlash, FaPhone, FaVideo, FaVideoSlash, FaCamera, FaDesktop, FaDesktopSlash, FaEllipsisV, FaPaperPlane } from "react-icons/fa"

export default function VirtualMeetingRoom() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { sender: "John", text: "Hello everyone! How are you all doing today?" },
    { sender: "Mary", text: "Hi John! I'm doing great, thanks for asking." },
    { sender: "Robert", text: "Good morning all! Excited for our book club discussion." },
  ])
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, { sender: "You", text: message.trim() }])
      setMessage("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Virtual Book Club Meeting</h1>
      
      <div className="flex flex-1 gap-4 mb-4">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2 aspect-video bg-gray-200 flex items-center justify-center relative">
              <FaVideo className="w-16 h-16 text-gray-500" />
              <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded text-sm">
                You (Main Speaker)
              </div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-gray-200 flex items-center justify-center relative">
                <FaVideo className="w-8 h-8 text-gray-500" />
                <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded text-sm">
                  Participant {i}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 flex justify-between items-center shadow-md rounded">
            <div className="flex gap-2">
              <button
                className="p-2 border rounded hover:bg-gray-100"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              <button
                className="p-2 border rounded hover:bg-gray-100"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <FaVideoSlash /> : <FaCamera />}
              </button>
              <button
                className="p-2 border rounded hover:bg-gray-100"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
              >
                {isScreenSharing ? <FaDesktopSlash /> : <FaDesktop />}
              </button>
            </div>
            <button className="p-2 border rounded hover:bg-red-100 text-red-500">
              <FaPhone className="rotate-45" />
            </button>
            <button className="p-2 border rounded hover:bg-gray-100">
              <FaEllipsisV />
            </button>
          </div>
        </div>
        
        <div className="w-80 bg-white p-4 shadow-md rounded flex flex-col">
          <h2 className="font-semibold mb-4">Chat</h2>
          <div className="flex-1 mb-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold">{msg.sender}: </span>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <hr className="my-2" />
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button type="submit" className="p-2 border rounded hover:bg-gray-100">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
      
      <div className="bg-white p-4 shadow-md rounded">
        <h2 className="font-semibold mb-2">Meeting Information</h2>
        <p>Topic: Monthly Book Club Discussion</p>
        <p>Current Book: "The Thursday Murder Club" by Richard Osman</p>
        <p>Duration: 60 minutes</p>
        <p>Participants: 4/10</p>
      </div>
    </div>
  )
}
