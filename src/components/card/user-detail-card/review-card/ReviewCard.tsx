"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { FC, useEffect, useRef } from "react";

import { EditCreateCard } from "../edit-create-card/EditCreateCard";

import styles from "./ReviewCard.module.scss";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  const userId = getSessionUser?.user?.id;

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
    (!userId && reviews.length == 0) ||
    (userId === teacher_id && reviews.length == 0)
  )
    return null;
  return (
    <section className={styles.ReviewCard}>
      <h2>Reviews</h2>
      <EditCreateCard
        teacher_id={teacher_id}
        teacher_subjects={teacher_subjects}
      />

      {reviews.map((item, index) => (
        <div key={index} className={styles.ReviewCard__Review}>
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

          <Textarea
            placeholder="Description review."
            value={item.reviews_text}
            ref={(el) => {
              descRefs.current[index] = el;
            }}
            disabled
            readOnly
          />
        </div>
      ))}

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
