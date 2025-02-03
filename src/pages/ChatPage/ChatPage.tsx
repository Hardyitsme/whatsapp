import { useState } from "react";
import { Chat } from "./widgets";
import { Dialogs } from "./widgets/componets/Dialogs/Dialogs";
import styles from "./ChatPage.module.scss";

export const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <Dialogs onSelectUser={setSelectedUser} />
      <div className={selectedUser ? styles.chatWrapper : styles.defaultBackground}>
        {selectedUser ? <Chat userName={selectedUser} /> : <p className={styles.placeholder}>Выберите чат</p>}
      </div>
    </div>
  );
};
