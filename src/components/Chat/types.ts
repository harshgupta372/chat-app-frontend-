export interface ChatPreview {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
}