import styles from "./Profile.module.scss";

interface ProfileProps {
  avatar: string;
  name: string;
}

export const Profile = ({ avatar, name }: ProfileProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarBox}>
        <img src={avatar} alt="avatar" />
      </div>

      <div className={styles.containerInfo}>
        <div className={styles.header}>
          <div className={styles.nameBox}>
            <span className={styles.name}>{name}</span>
          </div>
        </div>
        <div className={styles.message}></div>
      </div>
    </div>
  );
};
