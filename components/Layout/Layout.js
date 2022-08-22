import Head from "next/head";
import { useRouter } from "next/router";

import Header from '../Header/Header';

import styles from "./Layout.module.css";


export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <link rel="shortcut icon" href={`/images/${router.locale}/180.png`}></link>
        <meta
          name="description"
          content="Irancell Online Shop"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content=''
        />
        <meta name="og:title" content='Irancel' />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
