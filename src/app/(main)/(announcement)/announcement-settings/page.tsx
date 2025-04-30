"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import styles from "../announcement.module.scss";

import { AnnouncementCard } from "@/components/card/announcement-card/AnnouncementCard";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { AnnouncementsQuery, SubjectQuery } from "@/quaries";

const AnnouncementSettingsPage = () => {
  const { getSessionUser } = useAuthStore((state) => state);
  const Func = () => {
    const userId = getSessionUser?.user?.id;

    if (!userId) {
      throw new Error("User ID is missing");
    }
    return AnnouncementsQuery(
      getSessionUser?.session?.access_token
    ).announcementsListStudentDetail(userId);
  };
  const FuncSub = () => {
    return SubjectQuery().subjectsList();
  };
  const { data: announcement } = useQuery({
    queryKey: ["announcementList", getSessionUser?.user?.id],
    queryFn: Func,
    enabled: !!getSessionUser?.user?.id,
  });
  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: FuncSub,
    enabled: !!getSessionUser?.user?.id,
  });
  return (
    <div className={styles.AnnouncementPage}>
      <h1>Announcement</h1>
      <p>Your announcement are here, you can edit as you wish only here</p>
      <section className={styles.AnnouncementPage__List}>
        {announcement?.data?.map((item, index) => (
          <AnnouncementCard
            key={item.id}
            user_id={getSessionUser?.user?.id}
            token={getSessionUser?.session?.access_token}
            announcement_index={index + 1}
            all_subjects={subjects?.data}
            announcement={item}
          />
        ))}
      </section>
    </div>
  );
};
export default AnnouncementSettingsPage;
