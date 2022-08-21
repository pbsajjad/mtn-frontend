import styles from "./Alert.module.css";

const Alert = ({ children, type }) => {
  return <div className={`${styles.alert} ${styles[type]}`}>{children}</div>;
};

export default Alert;
