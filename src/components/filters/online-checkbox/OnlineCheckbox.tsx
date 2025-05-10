"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { PathPJ } from "@/utils/path";

export const OnlineCheckbox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isChecked, setIsChecked] = useState(false);

  const currentSort = searchParams.get("IsOnline") || undefined;

  useEffect(() => {
    setIsChecked(currentSort === "true");
  }, [currentSort]);

  const handleCheckboxChange = (state: boolean) => {
    setIsChecked(state);

    const params = new URLSearchParams(searchParams.toString());

    if (state) {
      params.set("online", "true");
    } else {
      params.delete("online");
    }

    router.replace(`${PathPJ.tutors}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <Checkbox
        id="IsOnlineBox"
        checked={isChecked}
        onCheckedChange={() => handleCheckboxChange(!isChecked)}
      />
      <label htmlFor="IsOnlineBox">Online lessons</label>
    </div>
  );
};
