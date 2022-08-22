import { useState, useContext } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import AppContext from "../../context/AppContext";

import { BsExclamationTriangle } from "react-icons/bs";

import TextInput from "./TextInput";
import ChargeList from "./ChargeList";
import ToggleButton from "../Button/ToggleButton";
import TabbedButton from "../Button/TabbedButton";
import SubmitButton from "../Button/SubmitButton";
import BankButton from "../Button/BankButton";
import Alert from "../Alert/Alert";

import styles from "./Form.module.css";

const Form = () => {
  let [apiResult, setApiResult] = useState({});
  const [error, setError] = useState("");
  const router = useRouter();

  const { t } = useTranslation("common");
  const {
    state: {
      mobile,
      email,
      bankName,
      chargeAmount,
      prepaid,
      wowCharge,
      submitted,
      valid
    },
    constants: { minCharge, maxCharge },
    setMobile,
    setEmail,
    setChargeAmount,
    setManualChargeAmount,
    setPrepaid,
    setWowCharge,
    setBankName,
    setSubmitted,
    setValid
  } = useContext(AppContext);

  function handleMobileChange(e) {
    const mobile = e.target.value;

    if (/[0-9]/g.test(mobile) && mobile.length <= 11) {
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

  function handleBankClick(name) {
    setBankName(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = false;

    if (!/09[0-9]{9}/g.test(mobile)) {
      setError("invalidMobile");
    } else if (!(minCharge <= chargeAmount && chargeAmount <= maxCharge)) {
      setError("invalidAmount");
    } else if (
      email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setError("invalidEmail");
    } else {
      isValid = true;
      setError("");
    }

    if (isValid) {
      setSubmitted(true);
      setValid(true);

      fetch(
        `https://joyous-sweater-fish.cyclic.app/api/validate?lang=${router.locale}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ mobile, email, chargeAmount })
        }
      )
        .then(res => res.json())
        .then(data => {
          if (!data.valid) {
            setError(data.errorKey);
          } else {
            setSubmitted(false);
            setApiResult(data);
            setBankName(data.banks[0]?.name);
          }
        });
    }
  }

  return (
    <form className={styles.formWrapper} autoComplete="off">
      <h1 className={styles.title}>{t("buyCharge")}</h1>
      <div className={styles.selectSimCard}>
        <h3 className={styles.subtitle}>{t("selectSimType")}</h3>
        <div className={styles.btnWrapper}>
          <TabbedButton label={t("simTypes.prepaid")} prepaid={true} active={prepaid} onClick={setPrepaid} />
          <TabbedButton label={t("simTypes.postpaid")} prepaid={false} active={!prepaid} onClick={setPrepaid} />
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
        type={error === 'invalidMobile' ? 'danger' : ''}
        ltr
      />

      <div>
        <h3 className={styles.subtitle}>{t("chargeAmount")}</h3>
        <ChargeList />
      </div>

      <TextInput
        text={t("emailIsOptional")}
        inputMode="email"
        classNames="mt-35"
        id="emailOptional"
        onChange={handleEmailChange}
        value={email}
        type={error === 'invalidEmail' ? 'danger' : ''}
        ltr
      />

      {valid ? (
        <div className={styles.chooseBank}>
          <h4>{t("chooseBank")}:</h4>
          <div className={styles.bankList}>
            {apiResult.banks?.map(bank => (
              <BankButton
                key={bank.id}
                name={bank.name}
                imageURL={bank.imageURL}
                active={bankName === bank.name}
                onClick={handleBankClick}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-20">
        <SubmitButton
          label={valid ? t("payAndCharge") : t("chooseBankAndPay")}
          submitted={submitted}
          onClick={handleSubmit}
        />
      </div>
      {error ? (
        <Alert type="danger">
          <BsExclamationTriangle /> <span>{t(error)}</span>
        </Alert>
      ) : null}
    </form>
  );
};

export default Form;
