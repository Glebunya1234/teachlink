"use client";

import { FC, use, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileTicherSchemaType } from "@/validations/shemas";

interface Props {
  form: UseFormReturn<ProfileTicherSchemaType>;
  styles: Record<string, string>;
  education?: string;
}

export const EducationInputsForm: FC<Props> = ({ form, styles, education }) => {
  useEffect(() => {
    if (education) {
      form.setValue("educational_institution", education, {
        shouldDirty: true,
      });
    }
  }, [education]);
  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="Education">
        Education:
      </Label>
      <FormField
        control={form.control}
        name="educational_institution"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div>
                <Input placeholder="Education name" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
