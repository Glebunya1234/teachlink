import React from "react";

import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

import CityInput from "./city-input/CityInput";
import PriceRangeInput from "./price-range-input/PriceRangeInput";
import SortCombobox from "./sort-combobox/SortCombobox";
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

        <ScrollArea className={styles.TeacherFilters_Subjects}>
          {subjects?.map((item) => (
            <div key={item.id} className="flex items-center space-x-2 mb-2">
              <Checkbox id={`${item.id}`} />
              <label htmlFor={`${item.id}`}>{item.subject}</label>
            </div>
          ))}
        </ScrollArea>
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
