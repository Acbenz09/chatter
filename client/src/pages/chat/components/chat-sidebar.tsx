"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Settings, Users } from "lucide-react";
import type { Chat, User } from "@/types";
import { RiArchive2Fill } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  chats: Chat[];
  currentUser: User;
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onClose?: () => void;
}

export function ChatSidebar({
  chats,
  currentUser,
  selectedChatId,
  onChatSelect,
  onClose,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 1) {
      return "now";
    } else if (hours < 24) {
      return `${Math.floor(hours)}h`;
    } else {
      return `${Math.floor(hours / 24)}d`;
    }
  };

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

  return (
    <div className="flex h-full flex-col border-r">
      {/* Header */}
      <div className="border-b p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Chatter</h1>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Chat List */}

      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => {
          const otherParticipant = chat.participants.find(
            (p) => p.id !== currentUser.id,
          );
          const isSelected = chat.id === selectedChatId;

          return (
            <div
              key={chat.id}
              onClick={() => {
                onChatSelect(chat.id);
                onClose?.();
              }}
              className={`hover:bg-secondary flex cursor-pointer items-center border-b p-4 transition-colors ${isSelected ? "border-r-4 border-b-0 border-green-500 bg-green-400/10" : ""} `}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
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
                    className={`absolute -right-1 bottom-1 h-2.5 w-2.5 rounded-full border-2 ${getStatusColor(otherParticipant.status)}`}
                  />
                )}
              </div>

              <div className="ml-3 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="truncate text-sm font-medium">{chat.name}</h3>
                  <div className="flex items-center space-x-2">
                    {chat.lastMessage && (
                      <span className="text-muted-foreground text-xs">
                        {formatTime(chat.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                </div>

                {chat.lastMessage && (
                  <div className="flex items-center">
                    <p className="text-muted-foreground mt-1 truncate text-sm">
                      {chat.lastMessage.senderId === currentUser.id
                        ? "You: "
                        : ""}
                      {chat.lastMessage.content}
                    </p>
                    {chat.unreadCount > 0 && (
                      <Badge
                        className={cn(
                          "ml-1 size-5 rounded-full text-xs font-medium",
                          chat.unreadCount >= 100 && "text-[8px]",
                        )}
                      >
                        {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
              <AvatarFallback className="">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 ${getStatusColor(currentUser.status)}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{currentUser.name}</p>
            <p className="text-sm capitalize">{currentUser.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
