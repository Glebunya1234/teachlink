"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useContext, useEffect, createContext } from "react";

import {
  signInUserPassword,
  TSignIn,
  logOut as loginOut,
} from "./FunctionProvider";

import { Announcements } from "@/gen/Announcements";
import { IsChekedRole } from "@/gen/IsChekedRole";
import { Students } from "@/gen/Students";
import { Teachers } from "@/gen/Teachers";
import useUserSession, { IUser } from "@/store/user-session";
import { createClient } from "@/utils/supabase/client";

interface AuthContextPops {
  getSessionUser: IUser | null;
  signInUserPassword(email: string, password: string): Promise<TSignIn>;
  logOut(): Promise<void>;
  updateData: () => Promise<IUser | null>;
}
const AuthContext = createContext<AuthContextPops>({} as AuthContextPops);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getSessionUser, setSessionUser } = useUserSession();

  const router = useRouter();

  const getUserData = async (): Promise<IUser | null> => {
    const { data } = await createClient().auth.getSession();

    if (!data.session) {
      setSessionUser(null);
      return null;
    }

    const { data: role } = await new IsChekedRole({
      baseURL: "http://localhost:5204",
    }).isChekedRoleDetail(data.session.user.id);

    // let object_id = null;
    let currentUser = null;
    if (role.isStudent) {
      const { data: user } = await new Students({
        baseURL: "http://localhost:5204",
      }).studentsDetail(data.session.user.id);
      currentUser = user;
    } else if (role.isTeacher) {
      const { data: user } = await new Teachers({
        baseURL: "http://localhost:5204",
      }).teachersDetail(data.session.user.id);
      currentUser = user;
    }

    setSessionUser({
      currentUser: currentUser,
      role: role.isTeacher ? "tutors" : role.isStudent ? "student" : null,
      user: data.session.user,
    });

    return getSessionUser;
  };

  const logOut = async () => {
    await loginOut();
    setSessionUser(null);
    router.refresh();
  };

  useEffect(() => {
    const { data } = createClient().auth.onAuthStateChange(
      async (_, session) => {
        if (!session) {
          setSessionUser(null);
          return;
        }
      }
    );

    getUserData();

    return data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getSessionUser,
        signInUserPassword,
        logOut,
        updateData: getUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
