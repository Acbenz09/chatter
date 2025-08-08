import type { Chat, Message, User } from "@/types";

export const currentUser: User = {
  id: "user-1",
  name: "You",
  status: "online",
  avatar: "/placeholder.svg?height=40&width=40&text=You",
};

export const users: User[] = [
  {
    id: "user-2",
    name: "Alice Johnson",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
  },
  {
    id: "user-3",
    name: "Bob Smith",
    status: "away",
    lastSeen: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40&text=BS",
  },
  {
    id: "user-4",
    name: "Carol Davis",
    status: "offline",
    lastSeen: "Yesterday",
    avatar: "/placeholder.svg?height=40&width=40&text=CD",
  },
  {
    id: "user-5",
    name: "David Wilson",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
  },
  {
    id: "user-6",
    name: "David Wilson",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
  },
  {
    id: "user-7",
    name: "David Wilson",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
  },
  {
    id: "user-8",
    name: "David Wilson",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
  },
  {
    id: "user-9",
    name: "David Wilson",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
  },
];

const messages: Message[] = [
  {
    id: "msg-1",
    senderId: "user-2",
    content: "Hey! How are you doing?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "text",
  },
  {
    id: "msg-2",
    senderId: "user-1",
    content: "I'm doing great! Just working on some projects. How about you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: "text",
  },
  {
    id: "msg-3",
    senderId: "user-2",
    content: "Same here! Been busy with the new design system we discussed.",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    type: "text",
  },
  {
    id: "msg-4",
    senderId: "user-1",
    content:
      "That sounds exciting! Would love to see what you've come up with.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "text",
  },
  {
    id: "msg-5",
    senderId: "user-2",
    content:
      "I'll share some screenshots later today. The color palette turned out really nice!",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    type: "text",
  },
];

export const chats: Chat[] = [
  {
    id: "chat-1",
    name: "Alice Johnson",
    type: "direct",
    participants: [currentUser, users[0]],
    messages: messages,
    lastMessage: messages[messages.length - 1],
    unreadCount: 2,
    avatar: users[0].avatar,
  },
  {
    id: "chat-2",
    name: "Bob Smith",
    type: "direct",
    participants: [currentUser, users[1]],
    messages: [
      {
        id: "msg-6",
        senderId: "user-3",
        content: "Are we still on for the meeting tomorrow?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        type: "text",
      },
    ],
    lastMessage: {
      id: "msg-6",
      senderId: "user-3",
      content: "Are we still on for the meeting tomorrow?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: "text",
    },
    unreadCount: 1,
    avatar: users[1].avatar,
  },
  {
    id: "chat-3",
    name: "Design Team",
    type: "group",
    participants: [currentUser, users[0], users[2], users[3]],
    messages: [
      {
        id: "msg-7",
        senderId: "user-4",
        content: "Great work on the latest mockups everyone!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        type: "text",
      },
    ],
    lastMessage: {
      id: "msg-7",
      senderId: "user-4",
      content: "Great work on the latest mockups everyone!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      type: "text",
    },
    unreadCount: 0,
    avatar: "/placeholder.svg?height=40&width=40&text=DT",
  },
  {
    id: "chat-4",
    name: "Carol Davis",
    type: "direct",
    participants: [currentUser, users[2]],
    messages: [
      {
        id: "msg-8",
        senderId: "user-1",
        content: "Thanks for the feedback on the project!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        type: "text",
      },
    ],
    lastMessage: {
      id: "msg-8",
      senderId: "user-1",
      content: "Thanks for the feedback on the project!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: "text",
    },
    unreadCount: 0,
    avatar: users[2].avatar,
  },
];
