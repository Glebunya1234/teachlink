import { FC } from "react";
import { use } from "react";

import styles from "./TeacherList.module.scss";

import TeachersCard from "@/components/card/teachers-card/TeachersCard";
import { TeacherCardFarmer } from "@/components/farmer-components/teacher-card-farmer/TeacherCardFarmer";
import { PaginationComponent } from "@/components/pagination";
import { TeacherTileDTOPaginationResponse } from "@/gen/data-contracts";
import { PathPJ } from "@/utils/path";

interface ITeacherList {
  promise: Promise<{ data: TeacherTileDTOPaginationResponse }>;
}

export const TeacherList: FC<ITeacherList> = ({ promise }) => {
  const { data } = use(promise);

  return (
    <div className={styles.TeacherList}>
      {data.items?.map((item, index) => (
        <TeacherCardFarmer index={index} key={item.uid}>
          <TeachersCard teacher={item} />
        </TeacherCardFarmer>
      ))}

      <PaginationComponent
        currentPage={1}
        mainLink={PathPJ.tutors}
        nextLink={PathPJ.tutorsPagination}
        hasNextPage={data.hasNextPage ?? false}
      />
    </div>
  );
};
