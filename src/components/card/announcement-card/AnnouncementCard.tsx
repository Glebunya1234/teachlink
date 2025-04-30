"use client";
import { Loader2, Pencil } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

import styles from "./AnnouncementCard.module.scss";
import { useUpdateAnnouncement } from "./func";

import { SubjectSelector } from "@/components/subject-selector/SubjectSelector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { AnnouncementDTO, SchoolSubjectDTO } from "@/gen/data-contracts";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AnnouncementCardProps {
  announcement: AnnouncementDTO;
  announcement_index: number;
  user_id?: string;
  all_subjects?: SchoolSubjectDTO[];
  token?: string;
}
export const AnnouncementCard: FC<AnnouncementCardProps> = ({
  announcement,
  announcement_index,
  user_id,
  all_subjects,
  token,
}) => {
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const minidescRef = useRef<HTMLTextAreaElement | null>(null);
  const miniDescEditorRef = useRef<HTMLTextAreaElement | null>(null);
  const descEditorRef = useRef<HTMLTextAreaElement | null>(null);

  const [miniDescEditor, setMiniDescEditor] = useState(
    announcement.mini_description
  );
  const [descEditor, setDescEditor] = useState(announcement.description);
  const [miniDesc] = useState(announcement.mini_description);
  const [desc] = useState(announcement.description);

  const [selectedSubjects, setSelectedSubjects] = useState<SchoolSubjectDTO[]>(
    []
  );

  useEffect(() => {
    setSelectedSubjects(announcement.school_subjects || []);
  }, [announcement]);

  useAutoResizeTextarea(minidescRef, miniDesc);
  useAutoResizeTextarea(descRef, desc);
  useAutoResizeTextarea(miniDescEditorRef, miniDescEditor);
  useAutoResizeTextarea(descEditorRef, descEditor);

  const mutation = useUpdateAnnouncement({
    token,
    user_id,
    announcement_index,
  });

  const Save = (
    mini_description: string,
    description: string,
    subjects: SchoolSubjectDTO[]
  ) => {
    mutation.mutate({
      id: announcement.id,
      body: {
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

        <Textarea
          ref={minidescRef}
          placeholder="Short information announcement."
          className="min-h-[50px] h-auto  overflow-hidden"
          value={miniDesc}
          readOnly
        />
      </section>
      <Separator />
      <section className={styles.AnnouncementCard_Desc}>
        <h2 className={styles.AnnouncementCard_H2}>
          Detail description announcement.
        </h2>
        <Textarea
          placeholder="Description announcement."
          className="min-h-[200px] h-auto  overflow-hidden"
          value={desc}
          ref={descRef}
          readOnly
        />
      </section>

      <section className={styles.AnnouncementCard_Nav}>
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <Pencil size={16} strokeWidth={2} />
            </Button>
          </SheetTrigger>
          <SheetContent className={styles.Editor}>
            <SheetHeader>
              <SheetTitle>
                Editing "Announcement {announcement_index}"
              </SheetTitle>
            </SheetHeader>
            <section className={styles.Editor_Section}>
              <Label htmlFor={`ShortAnn${announcement_index}`}>
                Select the subjects you want to find a tutor for:
              </Label>

              <SubjectSelector
                selectedSubjects={selectedSubjects}
                allSubjects={all_subjects ?? []}
                onToggle={toggleSubject}
              />
            </section>
            <section className={styles.Editor_Section}>
              <Label htmlFor={`ShortAnn${announcement_index}`}>
                Short information announcement:
              </Label>
              <Textarea
                placeholder="Short information announcement."
                className="min-h-[50px] h-auto  overflow-hidden"
                id={`ShortAnn${announcement_index}`}
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
              <Label htmlFor={`DetailAnn${announcement_index}`}>
                Detail description announcement:
              </Label>
              <Textarea
                placeholder="Description announcement."
                className="min-h-[200px] h-auto  overflow-hidden"
                value={descEditor}
                ref={descEditorRef}
                id={`DetailAnn${announcement_index}`}
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
                  Save(miniDescEditor, descEditor, selectedSubjects);
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
      </section>
    </div>
  );
};
