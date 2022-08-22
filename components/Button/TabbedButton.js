import styles from "./TabbedButton.module.css";

const TabbedButton = ({ label, prepaid, active, onClick }) => {
  return (
    <button
      className={`${styles.btn} ${active ? styles.active : ""}`}
      onClick={() => onClick(prepaid)}
      type="button"
    >
      {label}
    </button>
  );
};

export default TabbedButton;
