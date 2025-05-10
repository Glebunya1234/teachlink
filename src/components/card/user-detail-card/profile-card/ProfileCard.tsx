import { Star } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";

import styles from "./ProfileCard.module.scss";

import { Badge } from "@/components/ui/badge";

interface Props {
  full_name: string;
  review_count?: number;
  average_rating?: number;
  mini_description?: string;
  price?: number;
}

export const ProfileCard: FC<Props> = ({
  average_rating,
  full_name,
  mini_description,
  price,
  review_count,
}) => {
  return (
    <section className={styles.ProfileCard}>
      <div className={styles.ProfileCard__Avatar}>
        <div className={styles.Avatar__Wrapper}>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUspugOXub65sbxVHOEaD-JEKC8NNWgkWhlg&s"
            alt="Avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className={styles.ProfileCard__SectorDesc}>
        <h2>{full_name}</h2>

        <div className={styles.SectorDesc__StatWrapper}>
          <Badge variant="outline" className="justify-center">
            {review_count} reviews
          </Badge>

          <span className={styles.SpanIcon}>
            {average_rating} <Star size={14} color="#fac917" />
          </span>
        </div>
        <p>{mini_description}</p>

        <div className={styles.SectorConnect_Warper}>
          <span>Cost of lessons with a teacher: </span>
          <span className={styles.SectorConnect_Price}>{price} usd/hour</span>
        </div>
      </div>
    </section>
  );
};
