"use client";
import { Link2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import SessionActionComponent from "../session-actions/session-action-component";
import ThemeSwitcher from "../ui/theme-switcher/ThemeSwitcher";

import styles from "./header.module.scss";

import { PathPJ } from "@/utils/path";

const Header = () => {
  return (
    <div>
      <header className={styles.Header}>
        <div className={styles.Header__container_wrapper}>
          <ul className={styles.Header__nav}>
            <li className={styles.Header__nav__item_logo}>
              <Link2 />
              <span className={styles.LogoSpan}>TeachLink</span>
            </li>
            <li className={styles.Header__nav__item}>
              <Link href={PathPJ.tutors}>Tutors</Link>
            </li>
            <li className={styles.Header__nav__item}>
              <Link href={`${PathPJ.tutors}?online=true`}>Online tutors</Link>
            </li>
            <li className={styles.Header__nav__item}>
              <Link href={PathPJ.announcement}>Announcement</Link>
            </li>
          </ul>
          <ThemeSwitcher />
          <SessionActionComponent />
        </div>
      </header>
    </div>
  );
};

export default Header;
