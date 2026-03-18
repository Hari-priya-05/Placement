import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [chatHistory, setChatHistory] = useState([]);
  const [savedConversations, setSavedConversations] = useState([]);

  // Load chat history from localStorage
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`chat_history_${user.id}`);
      if (saved) {
        setChatHistory(JSON.parse(saved));
      }
      
      const conversations = localStorage.getItem(`saved_conversations_${user.id}`);
      if (conversations) {
        setSavedConversations(JSON.parse(conversations));
      }
    }
  }, [user]);

  const saveMessage = (message) => {
    const newHistory = [...chatHistory, message];
    setChatHistory(newHistory);
    if (user) {
      localStorage.setItem(`chat_history_${user.id}`, JSON.stringify(newHistory));
    }
  };

  const saveConversation = (conversation) => {
    const newSaved = [...savedConversations, { ...conversation, id: Date.now() }];
    setSavedConversations(newSaved);
    if (user) {
      localStorage.setItem(`saved_conversations_${user.id}`, JSON.stringify(newSaved));
    }
  };

  const clearHistory = () => {
    setChatHistory([]);
    if (user) {
      localStorage.removeItem(`chat_history_${user.id}`);
    }
  };

  return (
    <ChatContext.Provider value={{
      chatHistory,
      savedConversations,
      saveMessage,
      saveConversation,
      clearHistory
    }}>
      {children}
    </ChatContext.Provider>
  );
};