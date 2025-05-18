"use client";

import { Trash2 } from "lucide-react";
import { FC, useEffect, useState } from "react";

import { useRemoveAnnouncement } from "../func";

import styles from "./AnnouncementCardEdit.module.scss";
import { SheetEditor } from "./sheet-editor/SheetEditor";

import { ConfirmDeleteDialog } from "@/components/dialogs/confirm-dialog/ConfirmDelete";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnnouncementDTO, SchoolSubjectDTO } from "@/gen/data-contracts";
import { useDialogStore } from "@/provider/Avatar-Dialog-Provider/avatar-dialog-provider";

export interface AnnouncementCardProps {
  announcement: AnnouncementDTO;
  announcement_index: number;
  user_id?: string;
  all_subjects?: SchoolSubjectDTO[];
  token?: string;
}
export const AnnouncementCardEdit: FC<AnnouncementCardProps> = ({
  announcement,
  announcement_index,
  user_id,
  all_subjects,
  token,
}) => {
  const [miniDesc, setMiniDesc] = useState(announcement.mini_description);
  const [desc, setDesc] = useState(announcement.description);

  useEffect(() => {
    setDesc(announcement.description || "");
    setMiniDesc(announcement.mini_description || "");
  }, [announcement]);

  const mutationRemove = useRemoveAnnouncement({
    token,
    user_id,
  });
  const [open, setOpen] = useDialogStore("deleteDialog");

  const HandleRemove = () => {
    mutationRemove.mutate({
      id: announcement.id,
    });
  };

  return (
    <div className={styles.AnnouncementCard}>
      <section className={styles.AnnouncementCard_Title}>
        <h2 className={styles.AnnouncementCard_H2}>
          Announcement {announcement_index}
        </h2>
      </section>

      <section className={styles.AnnouncementCard_Subject}>
        <h2 className={styles.AnnouncementCard_H2}>Subjects</h2>
        <div className={styles.Subject_List}>
          {announcement.school_subjects.map((item, index) => (
            <Badge
              variant="secondary"
              key={index}
              className={styles.Subject_Item}
            >
              {item.subject}
            </Badge>
          ))}
        </div>
      </section>
      <Separator />
      <section className={styles.AnnouncementCard_MiniDesc}>
        <h2 className={styles.AnnouncementCard_H2}>
          Short information announcement.
        </h2>

        <p className={styles.AnnouncementCard_DescText}>{miniDesc}</p>
      </section>
      <Separator />
      <section className={styles.AnnouncementCard_Desc}>
        <h2 className={styles.AnnouncementCard_H2}>
          Detail description announcement.
        </h2>

        <p className={styles.AnnouncementCard_DescText}>{desc}</p>
      </section>

      <section className={styles.AnnouncementCard_Nav}>
        <SheetEditor
          announcement={announcement}
          announcement_index={announcement_index}
          all_subjects={all_subjects}
          token={token}
          user_id={user_id}
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash2 />
        </Button>
      </section>
      <ConfirmDeleteDialog onConfirm={HandleRemove} />
    </div>
  );
};
