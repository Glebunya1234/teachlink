"use client";

import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { SchoolSubjectDTO } from "@/gen/data-contracts";
import { SubjectQuery } from "@/quaries";
import { ProfileTicherSchemaType } from "@/validations/shemas";

interface Props {
  form: UseFormReturn<ProfileTicherSchemaType>;
  styles: Record<string, string>;
  subjects?: SchoolSubjectDTO[];
}

export const SubjectSelectForm: FC<Props> = ({ form, styles, subjects }) => {
  const { data } = useQuery({
    queryKey: ["subjects"],
    queryFn: SubjectQuery().subjectsList,
  });

  const [selectedSubjects, setSelectedSubjects] = useState<
    { subject: string }[]
  >([]);

  const toggleSubject = (subject: string) => {
    const updated = selectedSubjects.some((s) => s.subject === subject)
      ? selectedSubjects.filter((s) => s.subject !== subject)
      : [...selectedSubjects, { subject: subject }];

    setSelectedSubjects(updated);
    form.setValue("school_subjects", updated, { shouldDirty: true });
  };

  useEffect(() => {
    if (subjects) {
      const subjectsArray = subjects.map((s) => ({ subject: s.subject || "" }));
      setSelectedSubjects(subjectsArray);
      form.setValue("school_subjects", subjectsArray, {
        shouldDirty: true,
      });
    }
  }, [subjects, form]);

  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="Subjects">
        Subjects:
      </Label>

      <FormField
        control={form.control}
        name="school_subjects"
        render={() => (
          <FormItem>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {selectedSubjects.length > 0
                      ? `Selected: ${selectedSubjects.length}`
                      : "Add subject"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {data?.data.map((item) => {
                    const isChecked = selectedSubjects.some(
                      (s) => s.subject === item.subject
                    );
                    return (
                      <DropdownMenuCheckboxItem
                        key={item.id}
                        checked={isChecked}
                        onCheckedChange={() =>
                          toggleSubject(item.subject || "")
                        }
                      >
                        {item.subject}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
