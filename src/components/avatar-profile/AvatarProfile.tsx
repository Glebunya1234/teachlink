/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { PencilIcon } from "lucide-react";
import { FC } from "react";

import styles from "./AvatarProfile.module.scss";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialogStore } from "@/provider/Avatar-Dialog-Provider/avatar-dialog-provider";
interface IAvatar {
  avatarUrl?: string;
}

export const AvatarProfile: FC<IAvatar> = ({ avatarUrl }) => {
  const [_, setAvatarDialogOpen] = useDialogStore("avatarDialog");
  const [__, setConfirmDialogOpen] = useDialogStore("deleteDialog");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={styles.AvatarProfile_AvatarConteiner}>
          <Avatar className={styles.AvatarConteiner_AvatarWrapper}>
            <AvatarImage
              src={avatarUrl}
              className={styles.AvatarWrapper_Avatar}
              alt="@avatar"
            />
            <AvatarFallback>TH</AvatarFallback>
          </Avatar>
          <Badge variant="secondary" className={styles.EditOverlay}>
            Edit
            <PencilIcon size={12} />
          </Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="mr-10 mt-[-15px]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setAvatarDialogOpen(true);
            }}
          >
            Upload a photo...
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setConfirmDialogOpen(true);
            }}
          >
            Remove photo
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
