"use client";
import { AtSign, LogOut, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "../button";

import styles from "./ProfileButton.module.scss";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { PathPJ } from "@/utils/path";

const ProfileButton = () => {
  const router = useRouter();
  const { getSessionUser, logOut } = useAuthStore((state) => state);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={styles.ProfileButton__Button}>
          <Avatar className={styles.ProfileButton__Avatar}>
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUspugOXub65sbxVHOEaD-JEKC8NNWgkWhlg&s" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <p>{getSessionUser?.currentUser?.full_name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={async () => {
              router.push(PathPJ.notification);
            }}
          >
            <Mail />
            <span>Notification</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              router.push(
                getSessionUser?.role === "tutors"
                  ? PathPJ.tutorProfile
                  : PathPJ.studentProfile
              );
            }}
          >
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          {getSessionUser?.role === "student" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  router.push(PathPJ.announcementSettings);
                }}
              >
                <AtSign  />
                <span>My announcement</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logOut();

            router.replace(PathPJ.login);
          }}
        >
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
