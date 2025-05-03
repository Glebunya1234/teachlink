import Link from "next/link";
import React from "react";

import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__Wrapper}>
        <span>
          The source code is available on
          <Link href={"https://github.com/Glebunya1234/teachlink"}>
            GitHub.
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
