import Link from "next/link";
import React from "react";

import styles from "./AuthButtons.module.scss";

import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  return (
    <div className={styles.AuthButtons}>
      <Button
        className={styles.AuthButtons__Button_In}
        variant={"ghost"}
        asChild
      >
        <Link href="/log-in">Log In</Link>
      </Button>
      <Button className={styles.AuthButtons__Button_Up} asChild>
        <Link href="/sign-up"> Sign Up</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
