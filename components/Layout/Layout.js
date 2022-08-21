import Head from "next/head";

import Header from '../Header/Header';

import styles from "./Layout.module.css";


export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
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
