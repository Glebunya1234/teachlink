"use client";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { PathPJ } from "@/utils/path";

const BackButton = () => {
  return (
    <Button variant={"ghost"} size={"icon"} asChild>
      <Link href={PathPJ.tutors}>
        <Undo2 />
      </Link>
    </Button>
  );
};

export default BackButton;
