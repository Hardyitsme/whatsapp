import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = "https://api.green-api.com";

export const sendMessage = async (phone: string, message: string) => {
  const { idInstance, apiTokenInstance } = useAuthStore.getState();

  return axios.post(
    `${BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      chatId: `${phone}@c.us`,
      message,
    }
  );
};

export const getMessages = async () => {
  const { idInstance, apiTokenInstance } = useAuthStore.getState();
  return axios.get(
    `${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
  );
};
