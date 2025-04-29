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
  city?: string;
}

export const CityInputForm: FC<Props> = ({ form, styles, city }) => {
  useEffect(() => {
    if (city) {
      form.setValue("city", city, {
        shouldDirty: true,
      });
    }
  }, [city]);
  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="City">
        City:
      </Label>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div>
                <Input
                  placeholder="City name"
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
