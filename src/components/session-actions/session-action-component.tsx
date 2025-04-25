"use client";

import AuthButtons from "../auth-components/auth-buttons/AuthButtons";
import ProfileButton from "../ui/profile-button/ProfileButton";

import { useAuthStore } from "@/store/auth-provider";

const SessionActionComponent = () => {
  const { getSessionUser } = useAuthStore();

  return <>{!getSessionUser ? <AuthButtons /> : <ProfileButton />}</>;
};
export default SessionActionComponent;
