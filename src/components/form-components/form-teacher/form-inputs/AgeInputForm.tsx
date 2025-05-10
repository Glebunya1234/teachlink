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
import { ProfileTicherSchemaType } from "@/validations/shemas";

interface Props {
  form: UseFormReturn<ProfileTicherSchemaType>;
  styles: Record<string, string>;
  age?: number;
}

export const AgeInputForm: FC<Props> = ({ form, styles, age }) => {
  useEffect(() => {
    if (age) {
      form.setValue("age", age, { shouldDirty: true });
    }
  }, [age]);
  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="age">
        Age:
      </Label>

      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div>
                <Input
                  type="number"
                  placeholder="age"
                  {...field}
                  value={field.value ?? ""}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
