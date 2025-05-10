"use client";

import { FC, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileStudentSchemaType } from "@/validations/shemas";

interface Props {
  form: UseFormReturn<ProfileStudentSchemaType>;
  styles: Record<string, string>;
  fullname?: string;
}

export const FullNameInputsForm: FC<Props> = ({ form, styles, fullname }) => {
  useEffect(() => {
    if (fullname !== undefined) {
      form.setValue("full_name", fullname, { shouldDirty: true });
    }
  }, [fullname]);
  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="fullname">
        Full name
      </Label>
      <FormField
        control={form.control}
        name="full_name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
