"use client";

import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExperienceQuery } from "@/quaries";
import { ProfileTicherSchemaType } from "@/validations/shemas";

interface Props {
  form: UseFormReturn<ProfileTicherSchemaType>;
  styles: Record<string, string>;
  experience?: string; // передаётся experience_name
}

export const ExperienceSelectForm: FC<Props> = ({ form, styles, experience }) => {
  const { data } = useQuery({
    queryKey: ["experiences"],
    queryFn: ExperienceQuery().experiencesList,
  });

  useEffect(() => {
    if (
      experience && // пришло experience_name
      data?.data &&
      !form.getValues("experience") // если значение ещё не установлено
    ) {
      const found = data.data.find(
        (item) => item.experience_name === experience
      );
      if (found) {
        form.setValue("experience", found.id, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [experience, data, form]);

  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="Experience">
        Experience:
      </Label>

      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value || ""}
            >
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Experience">
                    {
                      data?.data.find(
                        (item) => item.id === field.value
                      )?.experience_name || "Select experience"
                    }
                  </SelectValue>
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {data?.data.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.experience_name}
                  </SelectItem>
                ))}
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>
        )}
      />
    </>
  );
};
