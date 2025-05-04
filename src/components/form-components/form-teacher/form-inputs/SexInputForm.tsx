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
  sex?: string;
}

export const SexInputForm: FC<Props> = ({ form, styles, sex }) => {
  useEffect(() => {
    if (sex) {
      form.setValue("sex", sex, { shouldDirty: true });
    }
  }, [sex]);
  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="sex">
        Gender:
      </Label>

      <FormField
        control={form.control}
        name="sex"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div>
                <Input placeholder="Male/Famale/...Other?" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
