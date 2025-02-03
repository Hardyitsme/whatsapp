import { useState, useEffect, useCallback } from "react";
import { loadMessagesFromStorage, saveMessagesToStorage } from "./ChatStorage";
import { sendMessageApi, getMessagesApi, deleteMessageApi } from "./ChatApi";
import { useAuthStore } from "../../../../store/useAuthStore";

export const useChatLogic = (userName: string) => {
  const [messages, setMessages] = useState<{ [key: string]: { text: string; sender: string }[] }>(loadMessagesFromStorage());
  const [message, setMessage] = useState("");
  const { idInstance, apiTokenInstance } = useAuthStore();

  useEffect(() => {
    saveMessagesToStorage(messages);
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    await sendMessageApi(idInstance, apiTokenInstance, userName, message);

    setMessages(prev => {
      const updatedMessages = {
        ...prev,
        [userName]: [...(prev[userName] || []), { text: message, sender: "me" }],
      };
      saveMessagesToStorage(updatedMessages);
      return updatedMessages;
    });

    setMessage("");
  };

  const getMessages = useCallback(async () => {
    const data = await getMessagesApi(idInstance, apiTokenInstance);

    if (!data || !data.body) return;

    if (data.body.typeWebhook === "incomingMessageReceived") {
      const incomingMessage = data.body.messageData?.textMessageData?.textMessage;
      const senderNumber = data.body.senderData.chatId.replace("@c.us", "");

      if (incomingMessage) {
        setMessages(prev => {
          const updatedMessages = {
            ...prev,
            [senderNumber]: [...(prev[senderNumber] || []), { text: incomingMessage, sender: "other" }],
          };
          saveMessagesToStorage(updatedMessages);
          return updatedMessages;
        });
      }

      await deleteMessageApi(idInstance, apiTokenInstance, data.receiptId);
    }
  }, [idInstance, apiTokenInstance]);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [getMessages]);

  return { messages, message, setMessage, sendMessage };
};
