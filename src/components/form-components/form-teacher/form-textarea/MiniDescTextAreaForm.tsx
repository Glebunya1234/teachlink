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
  mini_desc?: string;
}

export const MiniDescTextAreaForm: FC<Props> = ({
  form,
  styles,
  mini_desc,
}) => {
  useEffect(() => {
    if (mini_desc) {
      form.setValue("mini_description", mini_desc, {
        shouldDirty: true,
      });
    }
  }, [mini_desc]);
  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="MiniDescription">
        Short information about you:
      </Label>

      <FormField
        control={form.control}
        name="mini_description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Short information about you."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <p className="text-sm text-muted-foreground">
        Brief information about you should be up to 500 characters:
      </p>
    </>
  );
};
