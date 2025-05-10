"use client";
import { motion } from "motion/react";
import { FC } from "react";

import {
  variantsConnectCard,
  variantsContentCard,
  variantsSubjectCard,
  variantsUserCard,
} from "./variants";
interface IFarmer {
  children?: React.ReactNode;
}
interface IFarmerArr {
  children?: React.ReactNode;
  index: number;
}

export const UserProfileFarmer: FC<IFarmer> = ({ children }) => {
  return (
    <motion.div
      className="w-full"
      variants={variantsUserCard}
      custom={0}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};
export const UserConnectFarmer: FC<IFarmer> = ({ children }) => {
  return (
    <motion.div
      className="w-full max-w-[300px]"
      custom={1}
      variants={variantsConnectCard}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};
export const UserSubjectFarmer: FC<IFarmer> = ({ children }) => {
  return (
    <motion.div
      className="w-full"
      custom={2}
      variants={variantsSubjectCard}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};
export const UserContentFarmer: FC<IFarmerArr> = ({ children, index }) => {
  return (
    <motion.div
      className="w-full"
      custom={index}
      variants={variantsContentCard}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};
