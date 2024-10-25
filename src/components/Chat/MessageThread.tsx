import React, { useState, useRef, useEffect } from 'react';
import { Send, MoreVertical, Phone, Video } from 'lucide-react';
import { Message } from './types';

interface MessageThreadProps {
  chatId: string;
}

const messages: Message[] = [
  {
    id: '1',
    text: 'Hey, how are you?',
    sender: 'them',
    time: '10:00 AM'
  },
  {
    id: '2',
    text: "I'm doing great! Just finished the new feature we discussed.",
    sender: 'me',
    time: '10:02 AM'
  },
  {
    id: '3',
    text: "That's awesome! Can you show me the demo?",
    sender: 'them',
    time: '10:03 AM'
  },
  {
    id: '4',
    text: "Of course! I'll set up a meeting for later today.",
    sender: 'me',
    time: '10:05 AM'
  }
];

export default function MessageThread({ chatId }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      // In a real app, you would send the message to your backend here
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
            alt="Sarah Wilson"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-900">Sarah Wilson</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                message.sender === 'me'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'me' ? 'text-indigo-200' : 'text-gray-500'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-sm">Sarah is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 resize-none rounded-lg border border-gray-200 p-2 focus:outline-none focus:border-indigo-500 max-h-32"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-lg ${
              newMessage.trim()
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}