"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import styles from "./ContactComponent.module.scss";

import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { NotificationQuery } from "@/quaries/notifications";
import { PathPJ } from "@/utils/path";

interface Props {
  contact_id: string;
  contact_name: string;
  for_teacher: boolean;
}
interface ResponceProps {
  access_token: string;
  id_user: string;
  contact_id: string;
  for_teacher: boolean;
}
const NotificationResponce = async ({
  access_token,
  for_teacher,
  contact_id,
  id_user,
}: ResponceProps): Promise<void> => {
  if (for_teacher) {
    await NotificationQuery(access_token).notificationsCreate({
      id_student: id_user,
      id_teacher: contact_id,
      is_read: false,
      for_teacher: for_teacher,
    });
  } else {
    await NotificationQuery(access_token).notificationsCreate({
      id_student: contact_id,
      id_teacher: id_user,
      is_read: false,
      for_teacher: for_teacher,
    });
  }
};
export const ContactComponent: FC<Props> = ({
  for_teacher,
  contact_id,
  contact_name,
}) => {
  const { getSessionUser } = useAuthStore((state) => state);
  const user_id = getSessionUser?.user?.id;
  const access_token = getSessionUser?.session?.access_token;
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleConnect = async ({
    access_token,
    contact_id,
    for_teacher,
    id_user,
  }: ResponceProps) => {
    try {
      setSending(true);
      await NotificationResponce({
        access_token,
        for_teacher,
        contact_id,
        id_user,
      });
      toast({
        title: "Success",
        duration: 2000,
        description:
          "The user has received your message, please wait for a response.",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        duration: 2000,
        description: error?.response?.data || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };
  if (
    user_id == contact_id ||
    (for_teacher === true && getSessionUser?.role === "tutors")
  )
    return null;
  return (
    <div className={styles.ContactComponent}>
      <div>
        <h2>Respond to:</h2>
        <h3>{contact_name}</h3>
      </div>
      <Separator />
      {user_id && access_token ? (
        <>
          <p>
            After confirming the response, the user will receive a notification
            about you and will be able to contact you using your phone number
          </p>
          <Button
            variant="default"
            onClick={() => {
              handleConnect({
                access_token: access_token,
                contact_id,
                for_teacher,
                id_user: user_id,
              });
            }}
          >
            {sending ? (
              <>
                <Loader2 className="animate-spin" /> Sending...
              </>
            ) : (
              " Connect"
            )}
          </Button>
        </>
      ) : (
        <>
          <p>To contact users you need to log in</p>
          <Button
            variant="default"
            onClick={() => {
              router.push(PathPJ.login);
            }}
          >
            Log in
          </Button>
        </>
      )}
    </div>
  );
};
