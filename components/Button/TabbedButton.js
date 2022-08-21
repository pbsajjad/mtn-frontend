import styles from "./TabbedButton.module.css";

const TabbedButton = ({ title, description, extraInfo }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        {title}
        {extraInfo ? (
          <span className={styles.hintIcon} title={extraInfo}></span>
        ) : null}
      </h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default TabbedButton;
