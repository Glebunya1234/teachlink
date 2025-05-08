"use client";
import { motion } from "motion/react";
import { FC } from "react";

import { variants } from "./variants";
interface IFarmer {
  children?: React.ReactNode;
  index: number;
}

export const ADCardFarmer: FC<IFarmer> = ({ children, index }) => {
  return (
    <motion.div
      custom={index}
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover="whileHover"
    >
      {children}
    </motion.div>
  );
};
