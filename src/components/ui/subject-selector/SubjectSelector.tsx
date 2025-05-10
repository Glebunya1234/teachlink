// components/announcement-card/SubjectSelector.tsx

import { FC } from "react";

import styles from "./SubjectSelector.module.scss";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SchoolSubjectDTO } from "@/gen/data-contracts";

interface SubjectSelectorProps {
  selectedSubjects: SchoolSubjectDTO[];
  allSubjects: SchoolSubjectDTO[];
  onToggle: (subject: string) => void;
}

export const SubjectSelector: FC<SubjectSelectorProps> = ({
  selectedSubjects,
  allSubjects,
  onToggle,
}) => {
  return (
    <div className={styles.SubjectSelector}>
      <ul className={styles.SubjectSelector_List}>
        {selectedSubjects.map((item, index) => (
          <li key={index} className={styles.SubjectSelector_Item}>
            <Badge variant="secondary">{item.subject}</Badge>
          </li>
        ))}
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Add subject</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {allSubjects.map((item, index) => {
            const isChecked = selectedSubjects.some(
              (s) => s.subject === item.subject
            );
            return (
              <DropdownMenuCheckboxItem
                key={index}
                checked={isChecked}
                onCheckedChange={() => onToggle(item.subject || "")}
              >
                {item.subject}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
