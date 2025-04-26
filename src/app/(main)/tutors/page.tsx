import React from "react";

import styles from "./tutors.module.scss";

import TeachersCard from "@/components/card/teachers-card/TeachersCard";
import { TeacherQuery } from "@/quaries/teachers";

const TutorsPage = async () => {
  const fetchdata = await TeacherQuery().teachersList();

  return (
    <main className={styles.TutorsPage}>
      {fetchdata.data?.map((item) => (
        <TeachersCard teacher={item} key={item.uid} />
      ))}
    </main>
  );
};
export default TutorsPage;
