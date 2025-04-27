import React, { FC } from "react";

import styles from "../tutors.module.scss";

import TeachersCard from "@/components/card/teachers-card/TeachersCard";
import { PaginationComponent } from "@/components/pagination";
import { TeacherQuery } from "@/quaries/teachers";
interface Props {
  params: { id: number };
}

const tutorsIdPage: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const { data } = await TeacherQuery().teachersList({
    offset: id * 10 - 1,
    limit: 20,
  });

  return (
    <main className={styles.TutorsPage}>
      {data.items?.map((item) => (
        <TeachersCard teacher={item} key={item.uid} />
      ))}
      <PaginationComponent
        currentPage={Number(id)}
        hasNextPage={data.hasNextPage !== undefined ? data.hasNextPage : false}
      />
    </main>
  );
};
export default tutorsIdPage;
