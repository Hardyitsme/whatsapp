import { useState, useEffect } from "react";
import { Profile } from "../Profile/Profile";
import { avatarLogo } from "../constant";
import styles from "./Dialog.module.scss";

interface DialogsProps {
  onSelectUser: (name: string) => void;
}

export const Dialogs = ({ onSelectUser }: DialogsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(""); 
  const [profiles, setProfiles] = useState<{ id: string; avatar: string; name: string }[]>([]);

  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem("chats") || "[]");
    setProfiles(savedProfiles);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setError(""); 
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); 
    if (value.length <= 11) setInputValue(value);
  };

  const handleAddProfile = () => {
    if (inputValue.length !== 11) {
      setError("Введите корректный номер (11 цифр)");
      return;
    }

    if (profiles.find(profile => profile.name === inputValue)) {
      setError("Чат с этим номером уже существует!");
      return;
    }

    const newProfiles = [
      ...profiles,
      { id: Date.now().toString(), avatar: avatarLogo, name: inputValue },
    ];

    setProfiles(newProfiles);
    localStorage.setItem("chats", JSON.stringify(newProfiles)); 

    setInputValue("");
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Чаты</div>
        <button className={styles.newChat} onClick={handleOpenModal}>
          <span>
            <img src="https://cdn-icons-png.flaticon.com/128/14100/14100400.png" alt="newChatIcon" />
          </span>
        </button>
      </div>

      <div className={styles.body}>
        {profiles.map(profile => (
          <div key={profile.id} onClick={() => onSelectUser(profile.name)}>
            <Profile avatar={profile.avatar} name={profile.name} />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.footerText}>Нажмите на кнопку, чтобы начать новый диалог</span>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Введите номер</h3>
            <input
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={handleChange}
              placeholder="Введите номер телефона"
            />
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.addButton} onClick={handleAddProfile}>
              Добавить
            </button>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
