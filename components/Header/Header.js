import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import {
  MdPeople,
  MdShoppingCart,
  MdPerson,
  MdLanguage,
  MdOutlineKeyboardArrowDown,
  MdMenu,
  MdClose
} from "react-icons/md";

import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");
  let displayLocale = router.locales.find(
    lang => lang !== router.locale && lang !== "default"
  );
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    let dir = router.locale == "fa" ? "rtl" : "ltr";
    let lang = router.locale == "fa" ? "fa" : "en";

    document.querySelector("html").setAttribute("dir", dir);
    document.querySelector("html").setAttribute("lang", lang);

    async function fetchMenuItems() {
      fetch(`http://localhost:5500/api/settings?lang=${router.locale}`)
        .then(response => response.json())
        .then(data => {
          setMenuItems(data);
        });
    }
    fetchMenuItems();
  }, [router.locale]);

  function changeLanguage() {
    if (router.locale === "fa") {
      router.push(router.route, router.asPath, {
        locale: "en"
      });
    } else {
      router.push(router.route, router.asPath, {
        locale: "fa"
      });
    }
  }

  function handleOpenMenuClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className={styles.header}>
      <nav className="row">
        <div className={`${styles.sideMenu} col-lg-2 order-lg-2`}>
          <div className={styles.businessCustomer}>
            <a
              href={`https://shop.irancell.ir/${router.locale}?ct=corporate`}
              target="_blank"
            >
              <MdPeople /> <span>{t("businessCustomer")}</span>
            </a>
          </div>
          <ul className="center">
            <li className={styles.iconItem}>
              <a
                href={`https://shop.irancell.ir/${router.locale}/cart/product-list`}
                target="_blank"
              >
                <MdShoppingCart />
              </a>
            </li>
            <li className={styles.iconItem}>
              <button>
                <MdOutlineKeyboardArrowDown />
                <MdPerson />
              </button>
            </li>
            <li className={styles.iconItem}>
              <button onClick={changeLanguage}>
                <MdLanguage />{" "}
                <span className={styles.iconText}>
                  {displayLocale.toUpperCase()}
                </span>
              </button>
            </li>
          </ul>
        </div>
        <div className="col-lg-10 order-lg-1">
          <div className={styles.menu}>
            <Link href="/">
              <a className={styles.logo}>
                <Image
                  priority
                  src="/images/mtni-black.svg"
                  height={144}
                  width={144}
                />
              </a>
            </Link>
            <button
              className={styles.hamburgerIcon}
              onClick={handleOpenMenuClick}
            >
              {menuOpen ? <MdClose /> : <MdMenu />}
            </button>
            <ul className={styles.desktopList}>
              {menuItems.map((item, index) => (
                <li key={index} className={styles.item}>
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
          <ul className={styles.mobileList}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.item}>
                <a href={item.url} target="_blank">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
