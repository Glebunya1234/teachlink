import { Loader2, Plus } from "lucide-react";
import React, { FC, useRef, useState } from "react";

import { Button } from "../button";
import { Label } from "../label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import { Textarea } from "../textarea";

import styles from "./CreateAnnouncementButton.module.scss";

import { useCreateAnnouncement } from "@/components/card/announcement-card/func";
import { SubjectSelector } from "@/components/ui/subject-selector/SubjectSelector";
import { SchoolSubjectDTO } from "@/gen/data-contracts";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
interface AnnouncementCardProps {
  user_id: string;
  all_subjects?: SchoolSubjectDTO[];
  token: string;
}
export const CreateAnnouncementButton: FC<AnnouncementCardProps> = ({
  user_id,
  all_subjects,
  token,
}) => {
  const miniDescEditorRef = useRef<HTMLTextAreaElement | null>(null);
  const descEditorRef = useRef<HTMLTextAreaElement | null>(null);

  const [miniDescEditor, setMiniDescEditor] = useState("");
  const [descEditor, setDescEditor] = useState("");

  const [selectedSubjects, setSelectedSubjects] = useState<SchoolSubjectDTO[]>(
    []
  );

  useAutoResizeTextarea(miniDescEditorRef, miniDescEditor);
  useAutoResizeTextarea(descEditorRef, descEditor);

  const mutation = useCreateAnnouncement({
    token,
    user_id,
  });

  const HandleCreateAnnouncement = (
    user_id: string,
    mini_description: string,
    description: string,
    subjects: SchoolSubjectDTO[]
  ) => {
    mutation.mutate({
      body: {
        id_student: user_id,
        mini_description: mini_description,
        description: description,
        school_subjects: subjects,
      },
    });
  };

  const toggleSubject = (subjectName: string) => {
    setSelectedSubjects((prev) => {
      const exists = prev.find((s) => s.subject === subjectName);
      if (exists) {
        return prev.filter((s) => s.subject !== subjectName);
      } else {
        return [...prev, { subject: subjectName }];
      }
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          variant={"default"}
          className={styles.CreateAnnouncementButton__Trigger}
        >
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent className={styles.Editor}>
        <SheetHeader>
          <SheetTitle>Editing "Announcement"</SheetTitle>
        </SheetHeader>
        <section className={styles.Editor_Section}>
          <Label htmlFor={`ShortAnn`}>
            Select the subjects you want to find a tutor for:
          </Label>
          <SubjectSelector
            selectedSubjects={selectedSubjects}
            allSubjects={all_subjects ?? []}
            onToggle={toggleSubject}
          />
        </section>
        <section className={styles.Editor_Section}>
          <Label htmlFor={`ShortAnn`}>Short information announcement:</Label>
          <Textarea
            placeholder="Short information announcement."
            className="min-h-[50px] h-auto  overflow-hidden"
            id={`ShortAnn`}
            value={miniDescEditor}
            ref={miniDescEditorRef}
            onChange={(e) => {
              setMiniDescEditor(e.target.value);
            }}
          />
          <p className="text-sm text-muted-foreground">
            Short information must be between 20 to 500.
          </p>
        </section>
        <section className={styles.Editor_Section}>
          <Label htmlFor={`DetailAnn`}>Detail description announcement:</Label>
          <Textarea
            placeholder="Description announcement."
            className="min-h-[200px] h-auto  overflow-hidden"
            value={descEditor}
            ref={descEditorRef}
            id={`DetailAnn`}
            onChange={(e) => {
              setDescEditor(e.target.value);
            }}
          />
          <p className="text-sm text-muted-foreground">
            Detail description must be between 100 to 1500.
          </p>
        </section>
        <SheetFooter className={styles.Editor_Footer}>
          <Button
            className="w-full"
            onClick={() => {
              HandleCreateAnnouncement(
                user_id,
                miniDescEditor,
                descEditor,
                selectedSubjects
              );
            }}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="animate-spin" /> Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
