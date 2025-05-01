"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useRef, useState } from "react";

import styles from "./AnnouncementCardSearch.module.scss";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AnnouncementDTO, SchoolSubjectDTO } from "@/gen/data-contracts";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { PathPJ } from "@/utils/path";

interface AnnouncementCardProps {
  announcement: AnnouncementDTO;
  announcement_index: number;
  user_id?: string;
  all_subjects?: SchoolSubjectDTO[];
  token?: string;
}
export const AnnouncementCardSearch: FC<AnnouncementCardProps> = ({
  announcement,
  announcement_index,
}) => {
  const minidescRef = useRef<HTMLTextAreaElement | null>(null);

  const [miniDesc, setMiniDesc] = useState(announcement.mini_description);

  useAutoResizeTextarea(minidescRef, miniDesc);

  return (
    // <div className={styles.AnnouncementCardSearch}>
      <Link className={styles.AnnouncementCardSearch} href={`${PathPJ.announcementDetail}${announcement.id}`}>
        <section className={styles.AnnouncementCardSearch_SectorAvatar}>
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
            <h2 className={styles.AnnouncementCard_H2}>
              Announcement {announcement_index}
            </h2>
            <p className={styles.AnnouncementCard_Desc}>
              {announcement.id_students.full_name}
            </p>
            <p>{announcement.id_students.city}</p>
          </div>
        </section>
        <Separator />
        <section className={styles.AnnouncementCard_Subject}>
          <h2 className={styles.AnnouncementCard_H2}>Subjects</h2>
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
        <section className={styles.AnnouncementCard_MiniDesc}>
          <h2 className={styles.AnnouncementCard_H2}>
            Short information announcement.
          </h2>
          <Textarea
            ref={minidescRef}
            placeholder="Short information announcement."
            disabled
            value={miniDesc}
            readOnly
          />
        </section>

        <section className={styles.AnnouncementCard_Nav}></section>
      </Link>
    // </div>
  );
};
