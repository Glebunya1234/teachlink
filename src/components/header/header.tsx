"use client";
import Link from "next/link";
import React, { useEffect } from "react";

import SessionActionComponent from "../session-actions/session-action-component";
import ThemeSwitcher from "../ui/theme-switcher/ThemeSwitcher";

import styles from "./header.module.scss";

import stylepages from "@/app/main.module.scss";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { PathPJ } from "@/utils/path";
import { createClient } from "@/utils/supabase/client";

const Header = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { setSessionUser, updateData } = useAuthStore((state) => state);

  useEffect(() => {
    const supabase = createClient();
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session) {
        setSessionUser(null);
      }
    });

    updateData();

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <header className={styles.Header}>
        <div className={styles.Header__container_wrapper}>
          <ul className={styles.Header__nav}>
            <li className={styles.Header__nav__item}>
              <Link href={PathPJ.tutors}>Tutors</Link>
            </li>
            <li className={styles.Header__nav__item}>
              <Link href={PathPJ.tutors}>Online tutors</Link>
            </li>
            <li className={styles.Header__nav__item}>
              <Link href={PathPJ.announcement}>Announcement</Link>
            </li>
          </ul>
          <ThemeSwitcher />
          <SessionActionComponent />
        </div>
      </header>
      <main className={stylepages.page}> {children}</main>
    </div>
  );
};

export default Header;
