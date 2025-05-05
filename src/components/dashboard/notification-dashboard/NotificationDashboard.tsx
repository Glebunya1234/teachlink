"use client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC } from "react";

import styles from "./NotificationDashboard.module.scss";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { NotificationDTO } from "@/gen/data-contracts";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { NotificationQuery } from "@/quaries/notifications";

export const NotificationDashboard: FC = () => {
  const { getSessionUser } = useAuthStore((state) => state);
  const user = getSessionUser;
  const userId = getSessionUser?.user?.id;
  const token = getSessionUser?.session?.access_token;
  const role = getSessionUser?.role;

  const NotifResponse = () => {
    if (!userId || !token || !role) return;

    return NotificationQuery(token).notificationsList({
      id_entity: userId,
      for_teacher: role === "tutors",
    });
  };

  const { status, data: notifications } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: NotifResponse,
    enabled: !!userId && !!token && !!role,
  });

  const getNotificationMessage = (notification: NotificationDTO) => {
    const userName = user?.currentUser?.full_name;
    if (role === "student") {
      return `${userName}! \nA teacher named "${notification.id_teacher.full_name}" wants to contact you.\nTo contact him, use his email or phone number.\nEmail: ${notification.id_teacher.email}\nPhone: ${notification.id_teacher.phone_number}`;
    } else if (role === "tutors") {
      return `${userName}! \nA student named "${notification.id_student.full_name}" wants to contact you.\nTo contact him, use his email or phone number.\nEmail: ${notification.id_teacher.email}\nPhone: ${notification.id_teacher.phone_number}`;
    }
    return "";
  };

  return (
    <div className={styles.NotificationDashboard}>
      {status === "pending" && (
        <div className={styles.NotificationDashboard__Loading}>
          <Loader2 className="animate-spin" />
        </div>
      )}
      <Accordion type="single" collapsible className={styles.Accordion}>
        {notifications?.data?.map((notification) => (
          <AccordionItem
            key={notification.id}
            value={notification.id.toString()}
            className={styles.AccordionItem}
          >
            <AccordionTrigger
              className={styles.NotificationDashboard__AccordionTrigger}
            >
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
            <AccordionContent className={styles.AccordionContent}>
              <Textarea
                value={getNotificationMessage(notification)}
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
