"use client";
import { motion } from "motion/react";
import { FC } from "react";

import { variants } from "./variants";
interface IFarmer {
  children?: React.ReactNode;
  index: number;
  className?: string;
}

export const CardFarmer: FC<IFarmer> = ({ children, index, className }) => {
  return (
    <motion.div
      className={className}
      custom={index}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
