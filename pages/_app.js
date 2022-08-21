import { useState } from "react";

import { appWithTranslation } from "next-i18next";

import AppContext from "../context/AppContext";

import Layout from "../components/Layout/Layout";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.css";

function App({ Component, pageProps }) {
  const [mobile, setMobile] = useState("09");
  const [email, setEmail] = useState("");
  const [bankName, setsetBankName] = useState("");
  const [chargeAmount, setChargeAmount] = useState(20000);
  const [manualChargeAmount, setManualChargeAmount] = useState(false);
  const [prepaid, setPrepaid] = useState(true);
  const [wowCharge, setWowCharge] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const MIN_CHARGE = 10000;
  const MAX_CHARGE = 900000;

  const value = {
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
    constants: { minCharge: MIN_CHARGE, maxCharge: MAX_CHARGE },
    setMobile,
    setEmail,
    setChargeAmount,
    setManualChargeAmount,
    setPrepaid,
    setWowCharge,
    setSubmitted,
    setValid,
    setsetBankName
  };

  return (
    <AppContext.Provider value={value}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default appWithTranslation(App);
