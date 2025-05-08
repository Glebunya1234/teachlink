"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input"; // если нужно, поправь путь
import { PathPJ } from "@/utils/path";

const PriceRangeInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPriceFrom = searchParams.get("price_from") || "";
  const currentPriceTo = searchParams.get("price_to") || "";

  const [priceFrom, setPriceFrom] = useState(currentPriceFrom);
  const [priceTo, setPriceTo] = useState(currentPriceTo);

  const [priceFromTimeout, setPriceFromTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [priceToTimeout, setPriceToTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value.trim() !== "") {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }
    router.push(`${PathPJ.tutors}?${params.toString()}`);
  };

  const handlePriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPriceFrom(newValue);

    if (priceFromTimeout) {
      clearTimeout(priceFromTimeout);
    }

    const timeout = setTimeout(() => {
      updateQueryParam("price_from", newValue);
    }, 2000);

    setPriceFromTimeout(timeout);
  };

  const handlePriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPriceTo(newValue);

    if (priceToTimeout) {
      clearTimeout(priceToTimeout);
    }

    const timeout = setTimeout(() => {
      updateQueryParam("price_to", newValue);
    }, 1200);

    setPriceToTimeout(timeout);
  };

  // Обновляем инпуты при изменении searchParams
  useEffect(() => {
    setPriceFrom(currentPriceFrom);
    setPriceTo(currentPriceTo);
  }, [currentPriceFrom, currentPriceTo]);

  return (
    <div className="flex gap-2">
      <Input
        type="number"
        placeholder="Price from"
        value={priceFrom}
        onChange={handlePriceFromChange}
      />
      <Input
        type="number"
        placeholder="Price to"
        value={priceTo}
        onChange={handlePriceToChange}
      />
    </div>
  );
};

export default PriceRangeInput;
