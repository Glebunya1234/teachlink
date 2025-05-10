"use client";

import { FC, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  styles: Record<string, string>;
  email?: string;
}

export const EmailInputForm: FC<Props> = ({ styles, email }) => {
  const [emails, setEmail] = useState<string>("");
  useEffect(() => {
    setEmail(email || "");
  }, [email]);

  return (
    <>
      <Label className={styles.ProfilePage_Span} htmlFor="email">
        Email
      </Label>
      <Input
        type="email"
        id="email"
        disabled
        value={emails}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </>
  );
};
