"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import React, { FC, useEffect, useRef } from "react";

import { EditCreateCard } from "../edit-create-card/EditCreateCard";

import styles from "./ReviewCard.module.scss";

import { CardFarmer } from "@/components/farmer-components/card-farmer/CardFarmer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SchoolSubjectDTO } from "@/gen/data-contracts";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { ReviewQuery } from "@/quaries/review";

interface ReviewCardProps {
  teacher_subjects?: SchoolSubjectDTO[];
}
export const ReviewCard: FC<ReviewCardProps> = ({ teacher_subjects }) => {
  const pathname = usePathname();
  const teacher_id = pathname.split("/").slice(-1)[0];
  const { getSessionUser } = useAuthStore((state) => state);

  const role = getSessionUser?.role;
  const LIMIT = 4;

  const descRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const fetchReviews = async ({ pageParam = 0 }) => {
    if (!teacher_id) throw new Error("Teacher ID is missing");
    const res = await ReviewQuery().reviewsDetail(teacher_id, {
      offset: pageParam,
      limit: LIMIT,
    });
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["reviews", teacher_id],
      queryFn: fetchReviews,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const currentOffset = allPages.flatMap((p) => p.items ?? []).length;
        return currentOffset < (lastPage.totalCount ?? 0)
          ? currentOffset
          : undefined;
      },
      enabled: !!teacher_id,
    });

  const reviews = data?.pages.flatMap((page) => page.items ?? []) ?? [];

  useEffect(() => {
    reviews.forEach((_, i) => {
      const ref = descRefs.current[i];
      if (ref) {
        ref.style.height = "auto";
        ref.style.height = ref.scrollHeight + "px";
      }
    });
  }, [reviews]);

  if (
    (role === "tutors" && reviews.length == 0) ||
    (!role && reviews.length == 0)
  )
    return null;
  return (
    <section className={styles.ReviewCard}>
      <h2>Reviews</h2>
      <EditCreateCard
        teacher_id={teacher_id}
        teacher_subjects={teacher_subjects}
      />
      <AnimatePresence>
        {reviews.map((item, index) => (
          <CardFarmer
            key={item.id}
            index={index}
            className={styles.ReviewCard__Review}
          >
            {/* <div key={index} className={styles.ReviewCard__Review}> */}
            <div className={styles.Review__Wrapper}>
              <h2>{item.id_students.full_name}</h2>
              <div className={styles.Review__StarWrapper}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < item.rating ? "#fac917" : "none"}
                    color="#fac917"
                  />
                ))}
              </div>
              <Badge variant="secondary" className={styles.Review__Date}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Badge>
            </div>

            <div className={styles.Review__Subject}>
              {item.school_subjects.map((subject, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className={styles.Review__SubjectBadge}
                >
                  {subject.subject}
                </Badge>
              ))}
            </div>
            <p className={styles.Review__Desc}>{item.reviews_text}</p>
            {/* </div> */}
          </CardFarmer>
        ))}
      </AnimatePresence>

      {hasNextPage && reviews.length !== 0 && (
        <Button
          variant="outline"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : "Show more reviews"}
        </Button>
      )}
    </section>
  );
};
