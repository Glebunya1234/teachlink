"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

import styles from "./ThemeSwitcher.module.scss";

import { Button } from "@/components/ui/button";
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const isDarkMode = () => {
    if (theme === "dark") {
      setTheme("light");
      return;
    }
    setTheme("dark");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => isDarkMode()}
      className={styles.ThemeSwitcher}
    >
      <Sun className={styles.Sun} />
      <Moon className={styles.Moon} />
    </Button>
  );
};

export default ThemeSwitcher;
