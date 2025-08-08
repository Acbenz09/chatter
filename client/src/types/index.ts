export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
  edited?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  type: "direct" | "group";
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  avatar?: string;
}
