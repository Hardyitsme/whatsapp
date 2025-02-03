export const sendMessageApi = async (
  idInstance: string,
  apiTokenInstance: string,
  userName: string,
  message: string
) => {
  const apiUrl = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId: `${userName}@c.us`, message }),
  });
};

export const getMessagesApi = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  const receiveUrl = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
  const response = await fetch(receiveUrl);
  return response.json();
};

export const deleteMessageApi = async (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: string
) => {
  const deleteUrl = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;
  await fetch(deleteUrl, { method: "DELETE" });
};
