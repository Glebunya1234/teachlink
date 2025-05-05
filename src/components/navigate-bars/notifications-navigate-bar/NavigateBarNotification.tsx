import { Mail, MailOpen, Mails } from "lucide-react";
import { FC } from "react";

import styles from "./NavigateBarNotification.module.scss";

import { Button } from "@/components/ui/button";
import { useNotificationBarStore } from "@/provider/Notification-Provider/notification-provider";

export const NavigateBarNotification: FC = () => {
  const { getActiveBar, setActiveBar } = useNotificationBarStore(
    (state) => state
  );

  const getButtonVariant = (bar: "All" | "New" | "Read") =>
    getActiveBar === bar ? "outline" : "ghost";

  return (
    <div className={styles.NavigateBarNotification}>
      <Button
        variant={getButtonVariant("All")}
        size="lg"
        onClick={() => setActiveBar("All")}
      >
        <Mails />
        All notifications
      </Button>
      <Button
        variant={getButtonVariant("New")}
        size="lg"
        onClick={() => setActiveBar("New")}
      >
        <Mail /> New notifications
      </Button>
      <Button
        variant={getButtonVariant("Read")}
        size="lg"
        onClick={() => setActiveBar("Read")}
      >
        <MailOpen /> Read Notifications
      </Button>
    </div>
  );
};
