"use client";

import { FC, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProfileTicherSchemaType } from "@/validations/shemas";

interface Props {
  form: UseFormReturn<ProfileTicherSchemaType>;
  styles: Record<string, string>;
  desc?: string;
}

export const DescTextAreaForm: FC<Props> = ({ form, styles, desc }) => {
  useEffect(() => {
    if (desc) {
      form.setValue("description", desc, {
        shouldDirty: true,
      });
    }
  }, [desc]);
  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="MiniDescription">
        In details about you:
      </Label>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="In details about you:"
                className="min-h-[200px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <p className="text-sm text-muted-foreground">
        Detailed information about you should be no more than 10,000 characters.
      </p>
    </>
  );
};
