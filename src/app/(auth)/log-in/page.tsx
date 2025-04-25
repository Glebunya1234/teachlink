import React from "react";

import styles from "../auth.module.scss";

import LogInComponent from "@/components/auth-components/logIn-component/LogInComponent";

const LogInPage = () => {
  return (
    <main className={styles.page}>
      <LogInComponent />
    </main>
  );
};

export default LogInPage;
