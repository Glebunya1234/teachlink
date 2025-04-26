"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
const sortOptions = [
  { value: "Rating", label: "Rating" },
  { value: "Reviews", label: "Reviews" },
  { value: "PriceAsc", label: "Price: Low to High" },
  { value: "PriceDesc", label: "Price: High to Low" },
];

const SortCombobox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "Rating";

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentSort);

  useEffect(() => {
    setValue(currentSort);
  }, [currentSort]);

  const handleSelect = (selectedValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedValue) {
      params.set("sort", selectedValue);
    } else {
      params.delete("sort");
    }
    router.push(`?${params.toString()}`);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? sortOptions.find((option) => option.value === value)?.label
            : "Select sorting..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
         
          <CommandList>
            <CommandEmpty>No sorting found.</CommandEmpty>
            <CommandGroup>
              {sortOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => handleSelect(currentValue)}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default SortCombobox;
