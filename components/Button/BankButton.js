import styles from "./BankButton.module.css";

const BankButton = ({ name, imageURL, active, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.btn} ${active ? styles.active : ""}`}
        style={{
          backgroundImage: `url('${imageURL}')`
        }}
        type="button"
        onClick={() => onClick(name)}
      ></button>
    </div>
  );
};

export default BankButton;
