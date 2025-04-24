"use client";

import AuthButtons from "../auth-components/auth-buttons/AuthButtons";
import ProfileButton from "../ui/profile-button/ProfileButton";

import useUserSession from "@/store/user-session";

const SessionActionComponent = () => {
  const { getSessionUser } = useUserSession();

  return <>{!getSessionUser ? <AuthButtons /> : <ProfileButton />}</>;
};
export default SessionActionComponent;
