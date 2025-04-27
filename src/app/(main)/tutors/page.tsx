import React from "react";

import styles from "./tutors.module.scss";

import TeachersCard from "@/components/card/teachers-card/TeachersCard";
import { PaginationComponent } from "@/components/pagination";
import { TeacherQuery } from "@/quaries/teachers";

const TutorsPage = async () => {
  const { data } = await TeacherQuery().teachersList({ offset: 0, limit: 20 });

  return (
    <main className={styles.TutorsPage}>
      {data.items?.map((item) => (
        <TeachersCard teacher={item} key={item.uid} />
      ))}
      <PaginationComponent
        currentPage={1}
        hasNextPage={data.hasNextPage !== undefined ? data.hasNextPage : false}
      />
    </main>
  );
};
export default TutorsPage;
