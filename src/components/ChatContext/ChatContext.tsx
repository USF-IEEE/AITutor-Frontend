import React, { createContext, useContext } from 'react';

export const ChatContext = createContext({
    addNewMessage: (messageText: string, isPrompt: boolean) => {}
});

export const useChatContext = () => useContext(ChatContext);