import styles from "./InvoiceItem.module.css";

const InvoiceItem = ({ title, detailedTitle, description, extraInfo }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        <span className={detailedTitle ? styles.shortTitle : ''}>{title}</span>
        {detailedTitle ? (<span className={styles.detailedTitle}>{detailedTitle}</span>) : null}
        {extraInfo ? (
          <span className={styles.hintIcon} title={extraInfo}></span>
        ) : null}
      </h3>
      <p className={`${styles.description} number`}>{description}</p>
      
    </div>
  );
};

export default InvoiceItem;
