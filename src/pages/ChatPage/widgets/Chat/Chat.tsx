import { useRef } from "react";
import { SendHorizontal } from "lucide-react";
import styles from "./Chat.module.scss";
import { useChatLogic } from "./ChatLogic";
import { avatarLogo } from "../componets/constant";


interface ChatProps {
  userName: string;
}

export const Chat = ({ userName }: ChatProps) => {
  const { messages, message, setMessage, sendMessage } = useChatLogic(userName);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.chat}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img src={avatarLogo} alt="avatar" />
          </div>
          <span className={styles.userName}>{userName}</span>
        </div>
      </header>

      <div className={styles.chatBody} ref={chatBodyRef}>
        {(messages[userName] || []).map((msg, index) => (
          <div key={index} className={msg.sender === "me" ? styles.myMessage : styles.receivedMessage}>
            {msg.text}
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Введите сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>
            <SendHorizontal size={24} />
          </button>
        </div>
      </footer>
    </div>
  );
};
