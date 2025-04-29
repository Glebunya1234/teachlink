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
  phone?: number;
}

export const PhoneInputForm: FC<Props> = ({ form, styles, phone }) => {
  useEffect(() => {
    if (phone) {
      form.setValue("phone_number", phone, { shouldDirty: true });
    }
  }, [phone]);
  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="phone">
        Phone number
      </Label>
      <p className="mr-[-10px] text-lg font-bold text-neutral-500">+</p>
      <FormField
        control={form.control}
        name="phone_number"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="number"
                placeholder="XXX-XXX-XXXX"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
