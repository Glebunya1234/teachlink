"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

import { Button } from "@/components/ui/button";
import { PathPJ } from "@/utils/path";

const pagePage: NextPage = () => {
  const router = useRouter();
  return (
    <div className={styles.Page}>
      <h1>401</h1>
      <span>Unauthorized Access</span>
      <p>
        Please log in with the appropriate credentials to access this resource.
      </p>
      <div>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
        <Button onClick={() => router.replace(PathPJ.tutors)}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default pagePage;
