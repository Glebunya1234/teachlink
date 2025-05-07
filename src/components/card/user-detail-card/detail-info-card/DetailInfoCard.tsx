"use client";
import React, { FC } from "react";

import styles from "./DetailInfoCard.module.scss";

interface Props {
  description?: string;
  educational_institution?: string;
  degree?: string;
  experience?: string;
  age?: number;
  sex?: string;
}

export const DetailInfoCard: FC<Props> = ({
  description,
  educational_institution,
  degree,
  experience,
  age,
  sex,
}) => {
  return (
    <section className={styles.DetailInfoCard}>
      <h2>Information about yourself</h2>

      <p className={styles.DetailInfoCard__Description}>{description}</p>

      <div className={styles.DetailInfoCard__Wrapper}>
        <span>Education:</span>
        <span>{educational_institution}</span>
      </div>
      <div className={styles.DetailInfoCard__Wrapper}>
        <span>Academic title or academic degree:</span>
        <span>{degree}</span>
      </div>
      <div className={styles.DetailInfoCard__Wrapper}>
        <span>Experience:</span>
        <span>{experience}</span>
      </div>
      <div className={styles.DetailInfoCard__Wrapper}>
        <span>Age:</span>
        <span>{age}</span>
      </div>
      <div className={styles.DetailInfoCard__Wrapper}>
        <span>Gender:</span>
        <span>{sex}</span>
      </div>
    </section>
  );
};
