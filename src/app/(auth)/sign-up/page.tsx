import React from "react";

import styles from "../auth.module.scss";

import SignUpComponent from "@/components/auth-components/signup-component/SignUpComponent";

const SignUpPage = () => {
  return (
    <main className={styles.page}>
      <SignUpComponent />
    </main>
  );
};

export default SignUpPage;
