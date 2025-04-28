import React from "react";

import { Separator } from "../ui/separator";

import CityInput from "./city-input/CityInput";
import PriceRangeInput from "./price-range-input/PriceRangeInput";
import SortCombobox from "./sort-combobox/SortCombobox";
import { SubjectCheckboxes } from "./subjects-checkboxes/SubjectCheckboxes";
import styles from "./TeacherFilters.module.scss";

import { SubjectQuery } from "@/quaries/subjects";

const TeacherFilters = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { data: subjects } = await SubjectQuery().subjectsList();
  return (
    <div className={styles.TeacherFilters}>
      <section className={styles.TeacherFilters_WrapperFilters}>
        <h3>Subjects</h3>
        <SubjectCheckboxes subjects={subjects} />
        <Separator />

        <h3>Sort by city</h3>
        <CityInput />
        <Separator />

        <h3>Sort by price</h3>
        <PriceRangeInput />
        <Separator />

        <h3>Sorting method</h3>
        <SortCombobox />
      </section>

      {children}
    </div>
  );
};

export default TeacherFilters;
