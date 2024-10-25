import React from 'react';
import { Search, User, Circle } from 'lucide-react';
import { ChatPreview } from './types';

interface SidebarProps {
  onSelectChat: (chatId: string) => void;
  selectedChat: string | null;
}

const chatPreviews: ChatPreview[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    lastMessage: 'Sure, lets meet at 3 PM',
    time: '2m ago',
    unread: 2,
    online: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
  },
  {
    id: '2',
    name: 'Alex Thompson',
    lastMessage: 'The project looks great!',
    time: '1h ago',
    unread: 0,
    online: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
  },
  {
    id: '3',
    name: 'Emily Chen',
    lastMessage: 'Thanks for your help today',
    time: '2h ago',
    unread: 1,
    online: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
  }
];

export default function Sidebar({ onSelectChat, selectedChat }: SidebarProps) {
  return (
    <div className="w-80 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search chats..."
            className="bg-transparent border-none outline-none w-full text-sm"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chatPreviews.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-200
              ${selectedChat === chat.id ? 'bg-indigo-50' : ''}`}
          >
            <div className="relative">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {chat.online && (
                <Circle className="w-3 h-3 text-green-500 absolute bottom-0 right-0 fill-current" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
            
            {chat.unread > 0 && (
              <span className="bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                {chat.unread}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <User className="w-5 h-5" />
          <span className="font-medium">Your Profile</span>
        </button>
      </div>
    </div>
  );
}