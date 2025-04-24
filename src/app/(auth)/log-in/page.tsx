import React from "react";

import styles from "./log-in.module.scss"

import LogInComponent from "@/components/auth-components/logIn-component/LogInComponent";
const SignInPage = () => {
  return (
    <main className={styles.LoginInPage}>
      <LogInComponent />
    </main>
  );
};

export default SignInPage;
