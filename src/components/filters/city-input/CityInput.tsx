"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { PathPJ } from "@/utils/path";

const CityInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCity = searchParams.get("city") || "";
  const [city, setCity] = useState(currentCity);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setCity(newCity);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (newCity.trim() !== "") {
        params.set("city", newCity.trim());
      } else {
        params.delete("city");
      }
      router.replace(`${PathPJ.tutors}?${params.toString()}`);
    }, 1200);

    setTypingTimeout(timeout);
  };

  useEffect(() => {
    setCity(currentCity);
  }, [currentCity]);

  return (
    <div>
      <Input
        placeholder="Enter city..."
        value={city}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CityInput;
