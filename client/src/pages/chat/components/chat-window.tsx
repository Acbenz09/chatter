"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Users,
} from "lucide-react";
import type { Chat, Message, User } from "@/types";
import { RiArrowLeftWideFill, RiLayoutRight2Fill } from "@remixicon/react";

interface ChatWindowProps {
  chat: Chat;
  currentUser: User;
  onSendMessage: (content: string) => void;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ChatWindow({
  chat,
  currentUser,
  onSendMessage,
  setSidebarOpen,
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    onSendMessage(newMessage);
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const otherParticipant = chat.participants.find(
    (p) => p.id !== currentUser.id,
  );
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  const getUserById = (userId: string) => {
    return chat.participants.find((p) => p.id === userId) || currentUser;
  };

  // Group messages by date
  const groupedMessages = chat.messages.reduce(
    (groups: { [key: string]: Message[] }, message) => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    },
    {},
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center space-x-3">
          <Button
            size={"icon"}
            variant={"secondary"}
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <RiArrowLeftWideFill />
          </Button>
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={chat.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {chat.type === "group" ? (
                  <Users className="h-5 w-5" />
                ) : (
                  chat.name.slice(0, 2).toUpperCase()
                )}
              </AvatarFallback>
            </Avatar>
            {chat.type === "direct" && otherParticipant && (
              <div
                className={`absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 ${getStatusColor(otherParticipant.status)}`}
              />
            )}
          </div>
          <div>
            <h2 className="font-semibold">{chat.name}</h2>
            <p className="text-muted-foreground text-sm">
              {chat.type === "group"
                ? `${chat.participants.length} members`
                : otherParticipant?.status === "online"
                  ? "Online"
                  : `Last seen ${otherParticipant?.lastSeen || "recently"}`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/*  <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button> */}
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date}>
            {/* Date separator */}
            <div className="my-4 flex items-center justify-center">
              <div className="rounded-full px-3 py-1 text-xs">{date}</div>
            </div>

            {/* Messages for this date */}
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUser.id;
              const sender = getUserById(message.senderId);
              const showAvatar =
                !isCurrentUser &&
                (index === messages.length - 1 ||
                  messages[index + 1]?.senderId !== message.senderId);

              return (
                <div
                  key={message.id}
                  className={`flex items-center space-x-2 ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  {!isCurrentUser && (
                    <Avatar
                      className={`h-8 w-8 ${showAvatar ? "" : "invisible"}`}
                    >
                      <AvatarImage src={sender.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {sender.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[70%] ${isCurrentUser ? "items-end" : "items-start"} flex flex-col`}
                  >
                    {!isCurrentUser && chat.type === "group" && showAvatar && (
                      <span className="mb-1 ml-3 text-xs text-slate-500 dark:text-slate-400">
                        {sender.name}
                      </span>
                    )}
                    <div
                      className={`max-w-full rounded-2xl px-4 py-2 break-words ${
                        isCurrentUser
                          ? "rounded-br-none bg-blue-500 text-white"
                          : "bg-secondary rounded-bl-none"
                      } `}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    <span
                      className={`mt-1 text-xs text-slate-500 dark:text-slate-400 ${isCurrentUser ? "mr-2" : "ml-2"}`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2"
        >
          <Button variant="ghost" size="sm" type="button">
            <Paperclip className="h-4 w-4" />
          </Button>

          <div className="relative flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="absolute top-1/2 right-2 -translate-y-1/2 transform"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>

          <Button
            type="submit"
            disabled={!newMessage.trim()}
            className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
