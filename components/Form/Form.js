import { useState, useContext } from "react";
import { useTranslation } from "next-i18next";

import AppContext from "../../context/AppContext";

import { BsExclamationTriangle } from "react-icons/bs";

import TextInput from "./TextInput";
import ChargeList from "./ChargeList";
import ToggleButton from "../Button/ToggleButton";
import SubmitButton from "../Button/SubmitButton";
import Alert from "../Alert/Alert";

import styles from "./Form.module.css";

const Form = () => {
  const [error, setError] = useState("");

  const { t } = useTranslation("common");
  const {
    state: {
      mobile,
      email,
      bankName,
      chargeAmount,
      manualChargeAmount,
      prepaid,
      wowCharge,
      submitted,
      valid
    },
    setMobile,
    setEmail,
    setChargeAmount,
    setManualChargeAmount,
    setPrepaid,
    setWowCharge,
    setSubmitted,
    setValid
  } = useContext(AppContext);

  const chargeAmounts = [
    { value: 10000, wowCharge: false },
    { value: 20000, wowCharge: false },
    { value: 50000, wowCharge: true },
    { value: 100000, wowCharge: true },
    { value: 200000, wowCharge: true }
  ];

  function handleMobileChange(e) {
    const mobile = e.target.value;

    if (mobile.match(/[0-9]/g) && mobile.length <= 11) {
      setMobile(mobile);
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleWowChargeClick() {
    setWowCharge(!wowCharge);
    setManualChargeAmount(false);
    setChargeAmount(50000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    console.log("submitted");
    fetch("http://localhost:5500/api/validate", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ mobile, email, chargeAmount })
    })
      .then(res => res.json())
      .then(data => {
        if (!valid) {
          setError(data.errorKey);
        }
      });
  }

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>{t("buyCharge")}</h1>
      <div className={styles.selectSimCard}>
        <h3 className={styles.subtitle}>{t("selectSimType")}</h3>
        <div className={styles.btnWrapper}>
          <button
            className={`${styles.toggleBtn} ${prepaid ? styles.active : ""}`}
            onClick={() => setPrepaid(true)}
          >
            {t("simTypes.prepaid")}
          </button>
          <button
            className={`${styles.toggleBtn} ${!prepaid ? styles.active : ""}`}
            onClick={() => setPrepaid(false)}
          >
            {t("simTypes.postpaid")}
          </button>
        </div>
      </div>

      <ToggleButton
        label={t("wowCharge")}
        id="toggleWowCharge"
        disabled={!prepaid}
        onClick={handleWowChargeClick}
      />

      <TextInput
        text={t("mobileNumber")}
        inputMode="number"
        classNames="mb-35 number"
        id="mobileNumber"
        onChange={handleMobileChange}
        value={mobile}
        ltr
      />

      <div>
        <h3 className={styles.subtitle}>{t("chargeAmount")}</h3>
        <ChargeList />
      </div>

      <TextInput
        text={t("emailIsOptional")}
        inputMode="text"
        classNames="mt-35"
        id="emailOptional"
        onChange={handleEmailChange}
        value={email}
        ltr
      />

      {valid ? (
        <div className={styles.chooseBank}>
          <h4>{t("chooseBank")}:</h4>
          <div className={styles.bankList}>
            <div className={styles.bankWrapper}>
              <button
                className={styles.bankBtn}
                style={{
                  backgroundImage: `url('https://apishop.irancell.ir/static/v2/images/bankIcon/PSMN.png')`
                }}
              ></button>
            </div>
            <div className={styles.bankWrapper}>
              <button
                className={`${styles.bankBtn} ${styles.deactive}`}
                style={{
                  backgroundImage: `url('https://apishop.irancell.ir/static/v2/images/bankIcon/MLT.png')`
                }}
              ></button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-20">
        <SubmitButton
          label={t("chooseBankAndPay")}
          submitted={submitted}
          onClick={handleSubmit}
        />
      </div>
      {error ? (
        <Alert type="danger">
          <BsExclamationTriangle /> <span>{t(error)}</span>
        </Alert>
      ) : null}
    </div>
  );
};

export default Form;
