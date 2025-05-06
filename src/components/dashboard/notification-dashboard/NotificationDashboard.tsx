"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Mail, MailOpen } from "lucide-react";
import { FC, useState } from "react";

import {
  getNotificationMessage,
  handleCheckboxChange,
  handleSelectAll,
  handleMarkAll,
} from "./func";
import styles from "./NotificationDashboard.module.scss";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useNotificationBarStore } from "@/provider/Notification-Provider/notification-provider";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { NotificationQuery } from "@/quaries/notifications";

export const NotificationDashboard: FC = () => {
  const { getSessionUser } = useAuthStore((state) => state);
  const { getActiveBar } = useNotificationBarStore((state) => state);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const user = getSessionUser;
  const userId = user?.user?.id;
  const token = user?.session?.access_token;
  const role = user?.role;

  const NotifResponse = () => {
    if (!userId || !token || !role) return;
    return NotificationQuery(token).notificationsList({
      id_entity: userId,
      for_teacher: role === "tutors",
    });
  };

  const NotifResponseUpdate = (ids: string[], is_read: boolean) => {
    if (!userId || !token || !role || ids.length === 0) return;
    return NotificationQuery(token).notificationsIdsPartialUpdate({
      ids,
      is_read,
    });
  };

  const { status, data: notifications } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: NotifResponse,
    enabled: !!userId && !!token && !!role,
  });

  const filteredNotifications = notifications?.data
    ?.filter((notification) => {
      if (getActiveBar === "Read") return notification.is_read === true;
      if (getActiveBar === "New") return notification.is_read === false;
      return true;
    })
    ?.sort((a, b) => {
      if (getActiveBar === "All") {
        return Number(a.is_read) - Number(b.is_read);
      }
      return 0;
    });

  return (
    <div className={styles.NotificationDashboard}>
      <nav className={styles.NotificationDashboard__Nav}>
        <div className={styles.Nav__SelectAll}>
          <Checkbox
            id="select-all"
            checked={
              selectedIds.length > 0 &&
              selectedIds.length === notifications?.data.length
            }
            onCheckedChange={(checked) => {
              if (checked) {
                handleSelectAll(notifications?.data, setSelectedIds);
              } else {
                setSelectedIds([]);
              }
            }}
          />
          <label htmlFor="select-all">Select All</label>
        </div>
        <Button
          variant="ghost"
          className="ml-auto"
          onClick={() =>
            handleMarkAll(
              selectedIds,
              true,
              NotifResponseUpdate,
              queryClient,
              userId,
              setSelectedIds
            )
          }
        >
          <MailOpen />
          Mark All as Read
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            handleMarkAll(
              selectedIds,
              false,
              NotifResponseUpdate,
              queryClient,
              userId,
              setSelectedIds
            )
          }
        >
          <Mail /> Mark All as Unread
        </Button>
      </nav>

      {status === "pending" && (
        <div className={styles.NotificationDashboard__Loading}>
          <Loader2 className="animate-spin" />
        </div>
      )}

      <Accordion type="single" collapsible className={styles.Accordion}>
        {filteredNotifications?.map((notification, ind) => (
          <AccordionItem
            key={notification.id}
            value={notification.id.toString()}
            className={notification.is_read ? styles.AccordionItem__Read : ""}
          >
            <div className="flex items-center flex-row">
              <Checkbox
                id={`notification/${ind}`}
                checked={selectedIds.includes(notification.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(
                    Boolean(checked),
                    notification.id,
                    setSelectedIds
                  )
                }
              />
              <div className={styles.NotificationDashboard__AccordionTrigger}>
                <AccordionTrigger>
                  <div className={styles.AccordionTrigger__UserName}>
                    {role === "tutors"
                      ? notification.id_student.full_name
                      : notification.id_teacher.full_name}
                  </div>
                  <div className={styles.AccordionTrigger__DescriptionTrigger}>
                    {`Description: A ${
                      role == "student" ? "teacher" : "student"
                    } responded to your questionnaire`}
                  </div>
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent className={styles.AccordionContent}>
              <Textarea
                value={getNotificationMessage(
                  role,
                  user?.currentUser?.full_name,
                  notification
                )}
                readOnly
                disabled
                placeholder="Description"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
