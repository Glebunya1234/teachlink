"use client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import React from "react";

import styles from "../announcement.module.scss";

import { AnnouncementCardEdit } from "@/components/card/announcement-card/announcement-card-edit/AnnouncementCardEdit";
import { ADCardFarmer } from "@/components/farmer-components/ad-card-farmer/ADCardFarmer";
import { CardFarmer } from "@/components/farmer-components/card-farmer/CardFarmer";
import { CreateAnnouncementButton } from "@/components/ui/create-announcement-button/CreateAnnouncementButton";
import { EmptyPlaceholder } from "@/components/ui/empty-placeholder/EmptyPlaceholder";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { AnnouncementsQuery, SubjectQuery } from "@/quaries";

const AnnouncementSettingsPage = () => {
  const { getSessionUser } = useAuthStore((state) => state);
  const userId = getSessionUser?.user?.id;
  const userToken = getSessionUser?.session?.access_token;
  const Func = () => {
    if (!userId) {
      throw new Error("User ID is missing");
    }
    return AnnouncementsQuery(userToken).announcementsListStudentDetail(userId);
  };
  const FuncSub = () => {
    return SubjectQuery().subjectsList();
  };
  const { data: announcement } = useQuery({
    queryKey: ["announcementList", userId],
    queryFn: Func,
    enabled: !!userId,
  });
  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: FuncSub,
    enabled: !!userId,
  });
  return userId === undefined || userToken === undefined ? (
    <div className={styles.AnnouncementPage__Loader}>
      <Loader2 className="animate-spin" size={24} />
    </div>
  ) : (
    <div className={styles.AnnouncementPage}>
      <h1>Announcement</h1>
      <p>Your announcement are here, you can edit as you wish only here</p>
      {announcement?.data?.length === 0 && <EmptyPlaceholder type="Empty" />}
      <section className={styles.AnnouncementPage__List}>
        <AnimatePresence>
          {announcement?.data?.map((item, index) => (
            <CardFarmer key={item.id} index={index}>
              <AnnouncementCardEdit
                key={item.id}
                user_id={userId}
                token={userToken}
                announcement_index={index + 1}
                all_subjects={subjects?.data}
                announcement={item}
              />
            </CardFarmer>
          ))}
        </AnimatePresence>
      </section>
      <CreateAnnouncementButton
        all_subjects={subjects?.data}
        user_id={userId}
        token={userToken}
      />
    </div>
  );
};
export default AnnouncementSettingsPage;
