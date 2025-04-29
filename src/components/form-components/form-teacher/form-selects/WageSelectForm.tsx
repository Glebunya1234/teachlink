import { useEffect, useState } from "react";
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
import { ProfileTicherSchemaType } from "@/validations/shemas";

interface Props {
  form: UseFormReturn<ProfileTicherSchemaType>;
  styles: Record<string, string>;
  wage?: number;
}

const price = [
  { value: 100, label: "100 usd/hour" },
  { value: 150, label: "150 usd/hour" },
  { value: 200, label: "200 usd/hour" },
  { value: 250, label: "250 usd/hour" },
  { value: 300, label: "300 usd/hour" },
  { value: 350, label: "350 usd/hour" },
  { value: 400, label: "400 usd/hour" },
  { value: 450, label: "450 usd/hour" },
  { value: 500, label: "500 usd/hour" },
];

export const WageSelectForm = ({ form, styles, wage }: Props) => {
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();
  useEffect(() => {
    if (wage !== undefined) {
      const closest = price.reduce((prev, curr) =>
        Math.abs(curr.value - wage) < Math.abs(prev.value - wage) ? curr : prev
      );

      form.setValue("price", closest.value, { shouldDirty: true });
      setSelectedLabel(closest.label);
    }
  }, [wage]);

  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="Wage">
        Wage:
      </Label>
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(val) => {
                field.onChange(Number(val));
                const match = price.find((p) => p.value === Number(val));
                setSelectedLabel(match?.label);
              }}
              value={field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Wage">
                    {selectedLabel || "Wage"}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {price.map((item) => (
                  <SelectItem key={item.value} value={item.value.toString()}>
                    {item.label}
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
