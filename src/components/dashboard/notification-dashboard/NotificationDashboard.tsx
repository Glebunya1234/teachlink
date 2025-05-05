import { FC } from "react";

import styles from "./NotificationDashboard.module.scss";

import { NotificationDTO } from "@/gen/data-contracts";
import { useNotificationBarStore } from "@/provider/Notification-Provider/notification-provider";

interface INotificationDashboard {
  notifications?: NotificationDTO[];
}

export const NotificationDashboard: FC<INotificationDashboard> = ({
  notifications,
}) => {
  const { getActiveBar, setActiveBar } = useNotificationBarStore(
    (state) => state
  );
  return <div className={styles.NotificationDashboard}>{getActiveBar}</div>;
};
