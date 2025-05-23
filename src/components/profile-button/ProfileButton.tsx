"use client";
import { AtSign, LogOut, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "../ui/button";

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
  const avatarUrl =
    getSessionUser?.currentUser?.avatarUrl || PathPJ.defaultAvatar;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={styles.ProfileButton__Button}>
          <Avatar className={styles.ProfileButton__Avatar}>
            <AvatarImage src={avatarUrl} className="object-cover object-center"/>
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <p>{getSessionUser?.currentUser?.full_name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="w-56">
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
                <AtSign />
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
