import React from 'react';
import Sidebar from './Sidebar';
import MessageThread from './MessageThread';
import { MessageCircle } from 'lucide-react';

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null);
  
  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl h-[600px] flex overflow-hidden">
      <Sidebar onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      {selectedChat ? (
        <MessageThread chatId={selectedChat} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              Select a chat to start messaging
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}