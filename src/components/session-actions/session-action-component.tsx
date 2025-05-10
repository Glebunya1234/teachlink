"use client";

import AuthButtons from "../auth-components/auth-buttons/AuthButtons";
import ProfileButton from "../ui/profile-button/ProfileButton";

import { useAuthStore } from "@/provider/Store-Provider/auth-provider";

const SessionActionComponent = () => {
  const { getSessionUser } = useAuthStore((state) => state);

  return <>{!getSessionUser ? <AuthButtons /> : <ProfileButton />}</>;
};
export default SessionActionComponent;
