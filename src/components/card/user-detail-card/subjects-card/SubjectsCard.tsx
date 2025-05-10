import React, { FC } from "react";

import styles from "./SubjectsCard.module.scss";

import { Badge } from "@/components/ui/badge";

interface Props {
  school_subjects?:
    | {
        subject?: string;
      }[]
    | undefined;
}

export const SubjectsCard: FC<Props> = ({ school_subjects }) => {
  return (
    <section className={styles.SubjectsCard}>
      {school_subjects?.map((subject) => (
        <Badge key={`${subject.subject}`} variant="outline">
          {subject.subject}
        </Badge>
      ))}
    </section>
  );
};
