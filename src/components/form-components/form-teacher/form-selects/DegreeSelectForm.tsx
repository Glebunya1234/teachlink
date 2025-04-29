"use client";

import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DegreeQuery } from "@/quaries";
import { ProfileTicherSchemaType } from "@/validations/shemas";

interface Props {
  form: UseFormReturn<ProfileTicherSchemaType>;
  styles: Record<string, string>;
  degree?: string;
}

export const DegreeSelectForm: FC<Props> = ({ form, styles, degree }) => {
  const { data: degrees } = useQuery({
    queryKey: ["degrees"],
    queryFn: DegreeQuery().degreesList,
  });

  useEffect(() => {
    if (degree && degrees?.data && !form.getValues("degree")) {
      const found = degrees.data.find((item) => item.degree_name === degree);
      if (found) {
        form.setValue("degree", found.id, {
          shouldDirty: true,
        });
      }
    }
  }, [degree, degrees, form]);

  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="Degree">
        Degree:
      </Label>

      <FormField
        control={form.control}
        name="degree"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value || ""}
            >
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Degree">
                    {degrees?.data.find((item) => item.id === field.value)
                      ?.degree_name || "Select a degree"}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {degrees?.data.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.degree_name}
                  </SelectItem>
                ))}
              </SelectContent>
              <FormMessage />
            </Select>
          </FormItem>
        )}
      />
    </>
  );
};
