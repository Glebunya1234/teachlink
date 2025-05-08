"use client";
import type { SubjectDTO } from "@/gen/data-contracts";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

import styles from "./SubjectCheckboxes.module.scss";

import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PathPJ } from "@/utils/path";

interface SubjectCheckboxesProps {
  subjects: SubjectDTO[];
}

export const SubjectCheckboxes: FC<SubjectCheckboxesProps> = ({ subjects }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleSubjectChange = (subjectId: string) => {
    let updatedSubjects: string[];
    if (selectedSubjects.includes(subjectId)) {
      updatedSubjects = selectedSubjects.filter((id) => id !== subjectId);
    } else {
      updatedSubjects = [...selectedSubjects, subjectId];
    }
    setSelectedSubjects(updatedSubjects);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedSubjects.length > 0) {
      params.set("subjects", updatedSubjects.join(","));
    } else {
      params.delete("subjects");
    }
    router.push(`${PathPJ.tutors}?${params.toString()}`);
  };

  useEffect(() => {
    const subjectsFromUrl = searchParams.get("subjects");
    if (subjectsFromUrl) {
      setSelectedSubjects(subjectsFromUrl.split(","));
    }
  }, [searchParams]);
  return (
    <ScrollArea className={styles.SubjectsCheckboxes}>
      {subjects?.map((item) => (
        <div key={item.id} className="flex items-center space-x-2 mb-2">
          <Checkbox
            id={`${item.id}`}
            checked={
              item.subject ? selectedSubjects.includes(item.subject) : false
            }
            onCheckedChange={() =>
              item.subject && handleSubjectChange(item.subject)
            }
          />
          <label htmlFor={`${item.id}`}>{item.subject}</label>
        </div>
      ))}
    </ScrollArea>
  );
};
