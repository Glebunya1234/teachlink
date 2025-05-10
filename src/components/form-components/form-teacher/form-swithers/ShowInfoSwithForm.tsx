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
  show_info?: boolean;
}

export const ShowInfoSwithForm: FC<Props> = ({ form, styles, show_info }) => {
  useEffect(() => {
    if (form.formState.isSubmitted) return;
    form.reset({ ...form.getValues(), show_info });
  }, [show_info]);
  return (
    <>
      <div className={styles.Switch_Wrapper}>
        <Label className={styles.ProfilePage_Span} htmlFor="ShowProfile">
          Show profile
        </Label>
        <FormField
          control={form.control}
          name="show_info"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <span>
        Display my profile on the website (Press to activate your profile. If
        your profile is not active, you will not receive new orders.)
      </span>
    </>
  );
};
