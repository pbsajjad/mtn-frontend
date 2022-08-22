import { useContext } from "react";

import { useTranslation } from "next-i18next";

import AppContext from "../../context/AppContext";

import InvoiceItem from "./InvoiceItem";

import styles from "./Invoice.module.css";

const Invoice = () => {
  const { t } = useTranslation(["common", "built-in"]);
  const {
    state: { prepaid, mobile, email, wowCharge, bankName, chargeAmount }
  } = useContext(AppContext);

  function calculateChargeAmountWithTax() {
    const factor = prepaid ? 1.09 : 1;
    return chargeAmount * factor;
  }

  function calculateChargeReward() {
    return chargeAmount * 0.01;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.details}>
        <h2 className={styles.title}>{t("finalInvoice")}</h2>
        <InvoiceItem
          title={t("selectSimType")}
          description={prepaid ? t("simTypes.prepaid") : t("simTypes.postpaid")}
        />
        <InvoiceItem
          title={t("sendChargeDirectTo")}
          description={mobile ? mobile : "- - -"}
        />
        <InvoiceItem
          title={t("chargeAmountWithTax")}
          detailedTitle={t("chargeAmountWithTaxLong")}
          description={`${t("built-in:number", {
            val: calculateChargeAmountWithTax()
          })} ${t("currency")}`}
        />
        <InvoiceItem
          title={t("cashbackReward")}
          description={`${t("built-in:number", {
            val: calculateChargeReward()
          })} ${t("currency")}`}
          extraInfo={t("invoiceFooter")}
        />
        <InvoiceItem
          title={t("chargeType")}
          description={
            wowCharge ? t("chargeTypes.wow") : t("chargeTypes.normal")
          }
        />
        <InvoiceItem
          title={t("email")}
          description={email ? email : "- - -"}
        />
        <InvoiceItem title={t("bankName")} description={bankName ? bankName : "- - -"} />
      </div>
      <p className={styles.footerText}>
        <span>
          <span className={styles.hintIconLarge}></span>
        </span>
        {t("invoiceFooter")}
      </p>
    </div>
  );
};

export default Invoice;
