/* eslint-disable no-console */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Star } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";

import styles from "./EditCreateCard.module.scss";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubjectSelector } from "@/components/ui/subject-selector/SubjectSelector";
import { Textarea } from "@/components/ui/textarea";
import { SchoolSubjectDTO } from "@/gen/data-contracts";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { ReviewQuery } from "@/quaries/review";

interface IEditCreateCard {
  teacher_subjects?: SchoolSubjectDTO[];
  teacher_id?: string;
}

export const EditCreateCard: FC<IEditCreateCard> = ({
  teacher_subjects,
  teacher_id,
}) => {
  const queryClient = useQueryClient();
  const { getSessionUser } = useAuthStore((state) => state);
  const { toast } = useToast();
  const userId = getSessionUser?.user?.id;
  const userToken = getSessionUser?.session?.access_token;

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [EditReview, setEditReview] = useState<string | undefined>();
  const [selectedSubjects, setSelectedSubjects] = useState<SchoolSubjectDTO[]>(
    []
  );

  const EditDescRefs = useRef<HTMLTextAreaElement | null>(null);
  useAutoResizeTextarea(EditDescRefs, EditReview);

  const fetchUserReviews = async () => {
    if (!teacher_id || !userId) throw new Error("Teacher ID is missing");
    const res = await ReviewQuery(userToken).reviewsDetail2(teacher_id, userId);
    return res.data;
  };

  const { data: userReviews } = useQuery({
    queryKey: ["teacher", teacher_id, userId],
    queryFn: fetchUserReviews,
    enabled: !!teacher_id && !!userId,
  });

  useEffect(() => {
    setEditReview(userReviews?.reviews_text);
    setSelectedSubjects(userReviews?.school_subjects || []);
    setRating(userReviews?.rating ?? 0);
  }, [userReviews]);

  const updateUserReviews = async () => {
    if (!teacher_id || !userId || !userReviews) {
      toast({
        title: "Error",
        duration: 2000,
        description: "Failed to update review",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);

      const res = await ReviewQuery(userToken).reviewsPartialUpdate(
        userReviews.id,
        {
          rating: rating,
          reviews_text: EditReview,
          school_subjects: selectedSubjects,
        }
      );

      return res.data;
    } catch (error) {
      console.log("first", error);
    } finally {
      setLoading(false);
    }
  };

  const createUserReviews = async () => {
    if (!teacher_id || !userId) throw new Error("Teacher ID is missing");
    try {
      setLoading(true);
      const res = await ReviewQuery(userToken).reviewsCreate({
        id_teacher: teacher_id,
        id_student: userId,
        rating: rating,
        reviews_text: EditReview ?? "",
        school_subjects: selectedSubjects,
      });
      return res.data;
    } catch (error) {
      console.log("second", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubject = (subjectName: string) => {
    setSelectedSubjects((prev) => {
      const exists = prev.find((s) => s.subject === subjectName);
      if (exists) {
        return prev.filter((s) => s.subject !== subjectName);
      } else {
        return [...prev, { subject: subjectName }];
      }
    });
  };

  if (!userId || userId === teacher_id) return null;

  const isNewReview = !userReviews;

  const handleClick = async () => {
    if (isNewReview) {
      await createUserReviews();
    } else {
      await updateUserReviews();
    }

    queryClient.invalidateQueries({
      queryKey: ["reviews", teacher_id],
    });
  };

  const buttonText = isNewReview ? "Create review" : "Update review";
  const loadingText = isNewReview ? "Creating..." : "Updating...";

  return (
    <>
      <div className={styles.EditCreateCard}>
        <div className={styles.Review__Wrapper}>
          <h2>Your review</h2>
        </div>

        <div className={styles.Review__Subject}>
          <SubjectSelector
            allSubjects={teacher_subjects ?? []}
            selectedSubjects={selectedSubjects}
            onToggle={toggleSubject}
          />
        </div>

        <Textarea
          placeholder="Description review."
          value={EditReview}
          ref={EditDescRefs}
          onChange={(e) => {
            setEditReview(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />

        <div className={styles.Review__ButtonWrapper}>
          <div className={styles.Review__Wrapper}>
            <span>Rate the teacher: </span>
            <div className={styles.Review__StarWrapper}>
              {Array.from({ length: 5 }).map((_, i) => {
                const starIndex = i + 1;
                return (
                  <Star
                    key={i}
                    size={14}
                    fill={starIndex <= rating ? "#fac917" : "none"}
                    color="#fac917"
                    onClick={() => setRating(starIndex)}
                    style={{ cursor: "pointer" }}
                  />
                );
              })}
            </div>
          </div>

          <Button variant="secondary" onClick={handleClick}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> {loadingText}
              </>
            ) : (
              `${buttonText}`
            )}
          </Button>
        </div>
      </div>

      {!isNewReview && <Separator />}
    </>
  );
};
