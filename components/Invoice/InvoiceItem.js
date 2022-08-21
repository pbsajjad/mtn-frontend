import styles from "./InvoiceItem.module.css";

const InvoiceItem = ({ title, description, extraInfo }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        {title}
        {extraInfo ? (
          <span className={styles.hintIcon} title={extraInfo}></span>
        ) : null}
      </h3>
      <p className={`${styles.description} number`}>{description}</p>
    </div>
  );
};

export default InvoiceItem;
