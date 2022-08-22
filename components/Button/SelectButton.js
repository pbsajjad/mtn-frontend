import styles from "./SelectButton.module.css";

const SelectButton = ({value, label, sideLabel, disabled, active, bold, onClick}) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.selectBtn} ${active ? styles.active : ''}`}
        onClick={() => onClick(value)}
        disabled={disabled}
        type="button"
      >
        <span className={`${styles.label} ${bold ? styles.bold : ''}`}>{label}</span>
        {
          sideLabel ? (<span className={styles.sideLabel}>{sideLabel}</span>) : null
        }
        
      </button>
    </div>
  );
};

export default SelectButton;
