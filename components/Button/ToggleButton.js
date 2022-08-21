import styles from "./ToggleButton.module.css";

const ToggleButton = ({ label, id, disabled, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          id={id}
          value="on"
          disabled={disabled}
          onClick={onClick}
        />
        <div className={styles.btnSlider}></div>
      </label>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default ToggleButton;
