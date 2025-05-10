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
  greaduation_year?: number;
}

export const GraduationYearInputsForm: FC<Props> = ({
  form,
  styles,
  greaduation_year,
}) => {
  useEffect(() => {
    if (greaduation_year) {
      form.setValue("year_of_end", greaduation_year, { shouldDirty: true });
    }
  }, [greaduation_year]);
  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="GraduationYear">
        Graduation year:
      </Label>
      <FormField
        control={form.control}
        name="year_of_end"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div>
                <Input
                  type="number"
                  placeholder="yyyy"
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
