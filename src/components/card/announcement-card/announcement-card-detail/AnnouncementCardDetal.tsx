"use client";
import Image from "next/image";
import React, { FC, useState } from "react";

import styles from "./AnnouncementCardDetal.module.scss";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnnouncementDTO } from "@/gen/data-contracts";

interface Props {
  announcement: AnnouncementDTO;
}

export const AnnouncementCardDetal: FC<Props> = ({ announcement }) => {
  const [miniDesc] = useState(announcement.mini_description);
  const [desc] = useState(announcement.description);

  return (
    <div className={styles.AnnouncementCardDetail}>
      <section className={styles.AnnouncementCardDetail_SectorAvatar}>
        <div className={styles.SectorAvatar_Wrapper}>
          <AspectRatio ratio={1 / 1}>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUspugOXub65sbxVHOEaD-JEKC8NNWgkWhlg&s"
              alt="Avatar"
              layout="fill"
              objectFit="cover"
            />
          </AspectRatio>
        </div>
        <div className={styles.SectorAvatar_Announcement}>
          <h2 className={styles.AnnouncementCardDetail_H2}>Announcement</h2>
          <p className={styles.AnnouncementCardDetail_Desc}>
            {announcement.id_students.full_name}
          </p>
          <p>{announcement.id_students.city}</p>
          <p className={styles.AnnouncementCardDetail_Desc}>
            {announcement.id_students.age}
            {announcement.id_students.age ? " years old" : ""}
          </p>
        </div>
      </section>
      <Separator />
      <section className={styles.AnnouncementCardDetail_Subject}>
        <h2 className={styles.AnnouncementCardDetail_H2}>Subjects</h2>
        <div className={styles.Subject_List}>
          {announcement.school_subjects.map((item, index) => (
            <Badge
              variant="secondary"
              key={index}
              className={styles.Subject_Item}
            >
              {item.subject}
            </Badge>
          ))}
        </div>
      </section>
      <Separator />
      <section className={styles.AnnouncementCardDetail_MiniDesc}>
        <h2 className={styles.AnnouncementCardDetail_H2}>
          Short information announcement.
        </h2>

        <p className={styles.AnnouncementCardDetail__Description}>{miniDesc}</p>
      </section>
      <Separator />
      <section className={styles.AnnouncementCardDetail_Desc}>
        <h2 className={styles.AnnouncementCardDetail_H2}>
          Detail description announcement.
        </h2>

        <p className={styles.AnnouncementCardDetail__Description}>{desc}</p>
      </section>
    </div>
  );
};
