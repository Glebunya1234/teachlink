"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import styles from "./notification.module.scss";

import { NotificationDashboard } from "@/components/dashboard/notification-dashboard/NotificationDashboard";
import { NavigateBarNotification } from "@/components/navigate-bars/notifications-navigate-bar/NavigateBarNotification";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { NotificationQuery } from "@/quaries/notifications";

const NotificationPage = () => {
  const { getSessionUser } = useAuthStore((state) => state);
  const userId = getSessionUser?.user?.id;
  const token = getSessionUser?.session?.access_token;
  const role = getSessionUser?.role;

  const NotifResponse = () => {
    if (!userId || !token || !role) return;

    return NotificationQuery(token).notificationsList({
      id_entity: userId,
      for_teacher: role === "tutors" ? true : false,
    });
  };
  const { data: notifications } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: NotifResponse,
    enabled: !!userId && !!token && !!role,
  });

  return (
    <div className={styles.NotificationPage}>
      <section className={styles.NotificationPage__NavigateBar}>
        <NavigateBarNotification />
      </section>
      <section className={styles.NotificationPage__Dashboard}>
        <NotificationDashboard notifications={notifications?.data} />
      </section>
    </div>
  );
};
export default NotificationPage;
