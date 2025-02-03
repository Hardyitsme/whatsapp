export const loadMessagesFromStorage = () => {
  return JSON.parse(localStorage.getItem("messages") || "{}");
};

export const saveMessagesToStorage = (messages: {
  [key: string]: { text: string; sender: string }[];
}) => {
  localStorage.setItem("messages", JSON.stringify(messages));
};
