"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ChatSidebar } from "@/pages/chat/components/chat-sidebar";
import { ChatWindow } from "@/pages/chat/components/chat-window";
import { chats as initialChats, currentUser } from "@/data";
import type { Chat, Message } from "@/types";
import { cn } from "@/lib/utils";

export default function MessagingApp() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    chats[0]?.id || null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleSendMessage = (content: string) => {
    if (!selectedChatId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      content,
      timestamp: new Date(),
      type: "text",
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage,
            }
          : chat,
      ),
    );
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    setSidebarOpen(false);

    // Mark messages as read
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat,
      ),
    );
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-full transform transition-transform duration-300 ease-in-out lg:relative lg:z-0 lg:w-96 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <ChatSidebar
          chats={chats}
          currentUser={currentUser}
          selectedChatId={selectedChatId}
          onChatSelect={handleChatSelect}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex min-w-0 flex-1 shrink-0 flex-col">
        {selectedChat ? (
          <>
            {/* Mobile Header */}
            {/* <div className="flex items-center border-b border-slate-200 bg-white p-4 lg:hidden dark:border-slate-700 dark:bg-slate-900">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="mr-3"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {selectedChat.name}
              </span>
            </div> */}

            <ChatWindow
              chat={selectedChat}
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
              setSidebarOpen={setSidebarOpen}
            />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-slate-50 dark:bg-slate-800">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <Menu className="h-12 w-12 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Welcome to Messages
                </h2>
                <p className="max-w-md text-slate-600 dark:text-slate-400">
                  Select a conversation from the sidebar to start messaging with
                  your friends and colleagues.
                </p>
              </div>
              <Button
                onClick={() => setSidebarOpen(true)}
                className="bg-blue-500 text-white hover:bg-blue-600 lg:hidden"
              >
                Open Conversations
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="hidden w-96 shrink-0 border-l xl:block"></div>
    </div>
  );
}
