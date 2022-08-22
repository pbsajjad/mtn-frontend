import Head from "next/head";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useTranslation } from "next-i18next";

import Layout from "../components/Layout/Layout";
import Card from "../components/Card/Card";
import Form from "../components/Form/Form";
import Invoice from "../components/Invoice/Invoice";

export default function Charge() {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Head>
        <title>{t("metaTitle")}</title>
      </Head>

      <div className="container">
        <Card>
          <div className="row">
            <div className="col-md-7">
              <Form />
            </div>
            <div className="col-md-5">
              <Invoice />
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      // The code below is not related to fetching translations from backend.
      ...(await serverSideTranslations(locale, ["common", "built-in"]))
      // Will be passed to the page component as props
    }
  };
}
