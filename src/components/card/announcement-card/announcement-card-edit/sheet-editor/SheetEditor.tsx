import { Loader2, Pencil } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

import { useUpdateAnnouncement } from "../../func";
import { AnnouncementCardProps } from "../AnnouncementCardEdit";

import styles from "./SheetEditor.module.scss";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SubjectSelector } from "@/components/ui/subject-selector/SubjectSelector";
import { Textarea } from "@/components/ui/textarea";
import { SchoolSubjectDTO } from "@/gen/data-contracts";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

export const SheetEditor: FC<AnnouncementCardProps> = ({
  announcement,
  announcement_index,
  all_subjects,
  token,
  user_id,
}) => {
  const miniDescEditorRef = useRef<HTMLTextAreaElement | null>(null);
  const descEditorRef = useRef<HTMLTextAreaElement | null>(null);

  const [descEditor, setDescEditor] = useState(announcement.description);
  const [miniDescEditor, setMiniDescEditor] = useState(
    announcement.mini_description
  );
  const [selectedSubjects, setSelectedSubjects] = useState<SchoolSubjectDTO[]>(
    []
  );
  useEffect(() => {
    setSelectedSubjects(announcement.school_subjects || []);
  }, [announcement]);

  useAutoResizeTextarea(miniDescEditorRef, miniDescEditor);
  useAutoResizeTextarea(descEditorRef, descEditor);

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

  const HandleSave = (
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

  const mutation = useUpdateAnnouncement({
    token,
    user_id,
    announcement_index,
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="border-[#26262618] border-[1px]"
        >
          <Pencil size={16} strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent className={styles.Editor}>
        <SheetHeader>
          <SheetTitle>Editing "Announcement {announcement_index}"</SheetTitle>
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
              HandleSave(miniDescEditor, descEditor, selectedSubjects);
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
