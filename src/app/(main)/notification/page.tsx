import React from "react";

import styles from "./notification.module.scss";

import { NotificationDashboard } from "@/components/dashboard/notification-dashboard/NotificationDashboard";
import { NavigateBarNotification } from "@/components/navigate-bars/notifications-navigate-bar/NavigateBarNotification";

const NotificationPage = () => {
  return (
    <div className={styles.NotificationPage}>
      <section className={styles.NotificationPage__NavigateBar}>
        <NavigateBarNotification />
      </section>
      <section className={styles.NotificationPage__Dashboard}>
        <NotificationDashboard />
      </section>
    </div>
  );
};
export default NotificationPage;
