import { RadioTower } from "lucide-react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

import styles from "./TeachersCard.module.scss";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeacherTileDTO } from "@/gen/data-contracts";
import { PathPJ } from "@/utils/path";

interface Props {
  teacher: TeacherTileDTO;
}

const TeachersCard: FC<Props> = ({ teacher }) => {
  return (
    <section className={styles.TeachersCard}>
      <div className={styles.TeachersCard_SectorAvatar}>
        <div className={styles.SectorAvatar_Wrapper}>
          <AspectRatio ratio={1 / 1}>
            <Image
              src="https://preview.redd.it/youtube-avatar-advice-v0-nzyfuumjlkjb1.png?width=640&crop=smart&auto=webp&s=58f4301e4bb70d8037467bad72a80c88d5565563"
              alt="Avatar"
              layout="fill"
              objectFit="cover"
            />
          </AspectRatio>
        </div>
        <h2>{teacher.full_name}</h2>

        <Badge variant="outline" className="w-full justify-center">
          {teacher.review_count} reviews
        </Badge>

        <span className={styles.SpanIcon}>
          {teacher.average_rating} <Star size={14} color="#fac917" />
        </span>
      </div>
      <div className={styles.TeachersCard_SectorDesc}>
        <div className={styles.SectorDesc_Tags}>
          {teacher?.school_subjects?.map((subject) => (
            <Badge key={`${subject.subject}${teacher.id}`} variant="secondary">
              {subject.subject}
            </Badge>
          ))}
        </div>

        <div className={styles.TeachersCard_SectorDesc_Desc}>
          <span>Educational Institution: </span>
          <span>{teacher.educational_institution}</span>
        </div>
        <div className={styles.TeachersCard_SectorDesc_Desc}>
          <span>Experience: </span>
          <span>{teacher.experience}</span>
        </div>
        {teacher.online && (
          <span className="flex text-base items-center gap-2">
            <RadioTower size={14} color="#30a36c" />
            The teacher can conduct lessons online
          </span>
        )}

        <p>{teacher.mini_description}</p>
      </div>
      <div className={styles.TeachersCard_SectorConnect}>
        <div className={styles.SectorConnect_Warper}>
          <span className={styles.SectorConnect_City}>{teacher.city}</span>
          <Button className={styles.SectorConnect_Button} asChild>
            <Link href={`${PathPJ.user}${teacher.uid}`}>Сontacts a tutor</Link>
          </Button>
          <span className={styles.SectorConnect_Price}>
            {teacher.price} usd/hour
          </span>
        </div>
        <Button variant="link" asChild>
          <Link href={`${PathPJ.user}${teacher.uid}`}>More info...</Link>
        </Button>
      </div>
    </section>
  );
};

export default TeachersCard;
