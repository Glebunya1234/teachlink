import React, { FC } from "react";

import styles from "../tutors.module.scss";

import TeachersCard from "@/components/card/teachers-card/TeachersCard";
import { PaginationComponent } from "@/components/pagination";
import { SortByEnumMDB } from "@/gen/data-contracts";
import { TeacherQuery } from "@/quaries/teachers";

interface Props {
  params: { id: number };
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const tutorsIdPage: FC<Props> = async ({ params, searchParams }) => {
  const { id } = await params;

  const query = (await searchParams) ?? {};

  const sort = Object.values(SortByEnumMDB).includes(
    query.sort as SortByEnumMDB
  )
    ? (query.sort as SortByEnumMDB)
    : undefined;

  const minPrice =
    query.price_from && !isNaN(Number(query.price_from))
      ? Number(query.price_from)
      : undefined;

  const maxPrice =
    query.price_to && !isNaN(Number(query.price_to))
      ? Number(query.price_to)
      : undefined;

  const city = typeof query.city === "string" ? query.city : undefined;

  const subjects = typeof query.subjects === "string" ? query.subjects : "";

  const { data } = await TeacherQuery().teachersList({
    offset: id * 10 - 1,
    limit: 20,
    sortBy: sort,
    city,
    minPrice,
    maxPrice,
    subjects,
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
