import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom"; 
import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const { setAuth } = useAuthStore();
  const navigate = useNavigate(); 

  const handleLogin = () => {
    setAuth(idInstance, apiTokenInstance);
    navigate("/chat"); 
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Вход</h2>

        <div className={styles.inputGroup}>
          <input
            placeholder="idInstance"
            className={styles.input}
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            placeholder="apiTokenInstance"
            className={styles.input}
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
          />
        </div>

        <button className={styles.button} onClick={handleLogin}>
          Войти
        </button>
      </div>
    </div>
  );
};
