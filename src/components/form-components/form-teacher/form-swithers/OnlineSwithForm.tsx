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
import { Switch } from "@/components/ui/switch";
import { ProfileTicherSchemaType } from "@/validations/shemas";

interface Props {
  form: UseFormReturn<ProfileTicherSchemaType>;
  styles: Record<string, string>;
  online: boolean;
}

export const OnlineSwithForm: FC<Props> = ({
  form,
  styles,
  online = false,
}) => {
  useEffect(() => {
    if (form.formState.isSubmitted) return;
    form.reset({ ...form.getValues(), online });
  }, [online]);

  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="ShowProfile">
        I can teach online (videoconferencing):
      </Label>
      <FormField
        control={form.control}
        name="online"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
