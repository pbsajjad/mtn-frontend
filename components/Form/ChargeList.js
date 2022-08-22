import { useContext } from "react";
import { useTranslation } from "next-i18next";

import AppContext from "../../context/AppContext";

import TextInput from "./TextInput";
import SelectButton from "../Button/SelectButton";
import Alert from "../Alert/Alert";

import styles from "./ChargeList.module.css";

const ChargeList = () => {
  const { t } = useTranslation("common");

  const {
    state: { chargeAmount, manualChargeAmount, wowCharge },
    constants: { minCharge, maxCharge },
    setChargeAmount,
    setManualChargeAmount
  } = useContext(AppContext);

  const chargeAmounts = [
    { value: 10000, wowCharge: false },
    { value: 20000, wowCharge: false },
    { value: 50000, wowCharge: true },
    { value: 100000, wowCharge: true },
    { value: 200000, wowCharge: true }
  ];

  function handleChargeAmountChange(e) {
    const amount = e.target.value.replace(/,/g, '');

    if (amount <= maxCharge) {
      setChargeAmount(amount);
    } else {
      setChargeAmount(chargeAmount);
    }
  }

  function handleChargeAmountClick(amount) {
    setChargeAmount(amount ?? chargeAmount);
    setManualChargeAmount(amount ? false : true);
  }

  function currencyFormatter(amount) {
    return amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <div className={styles.wrapper}>
        {chargeAmounts.map((charge, index) => (
          <SelectButton
            key={index}
            value={charge.value}
            label={t("built-in:number", { val: charge.value })}
            sideLabel={t("currencySign")}
            disabled={wowCharge && !charge.wowCharge ? true : false}
            active={
              chargeAmount === charge.value && !manualChargeAmount
                ? true
                : false
            }
            onClick={handleChargeAmountClick}
            bold
          />
        ))}
        <SelectButton
          label={t("otherPrices")}
          disabled={wowCharge ? true : false}
          active={manualChargeAmount === true && !wowCharge ? true : false}
          onClick={handleChargeAmountClick}
        />
      </div>
      {manualChargeAmount === true && !wowCharge ? (
        <div>
          <TextInput
            text={t("chargeAmountInRials")}
            inputMode="text"
            classNames="mt-35"
            id="amount"
            onChange={handleChargeAmountChange}
            value={currencyFormatter(chargeAmount)}
            ltr
          />
          <Alert>
            <div className="center">
              <small>
                <span>{t("min")} </span>
                <span>{t("built-in:number", { val: minCharge })} </span>
                <span>{t("and")} </span>
                <span>{t("max")} </span>
                <span>{t("built-in:number", { val: maxCharge })} </span>
                <span>{t("currency")}</span>
              </small>
            </div>
          </Alert>
        </div>
      ) : null}
    </>
  );
};

export default ChargeList;
