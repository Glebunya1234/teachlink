"use client";
import { motion } from "motion/react";
import { FC } from "react";

import { variants } from "./variants";
interface ITeacherCardFarmer {
  children?: React.ReactNode;
  index: number;
}

export const TeacherCardFarmer: FC<ITeacherCardFarmer> = ({
  children,
  index,
}) => {
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
