import type { IUser } from "@/types/store-types";

import { create } from "zustand";

import { TSignIn, TSignUp, signInUserPassword, signUpUserPassword, logOut as logoutAPI } from "@/provider/FunctionProvider";
import { AuthQuery } from "@/quaries/auth";
import { StudentQuery } from "@/quaries/students";
import { TeacherQuery } from "@/quaries/teachers";
import { createClient } from "@/utils/supabase/client";

interface AuthState {
    getSessionUser: IUser | null;
    setSessionUser: (user: IUser | null) => void;

    signInUserPassword(email: string, password: string): Promise<TSignIn>;
    signUpUserPassword(username: string, email: string, password: string, isTeacher: "teacher" | "student"): Promise<TSignUp>;
    logOut(): Promise<void>;
    updateData(): Promise<IUser | null>;
}

export const useAuthStore = create<AuthState>((set) => ({
    getSessionUser: null,
    setSessionUser: (user) => set({ getSessionUser: user }),

    signInUserPassword: async (email, password) => {
        return await signInUserPassword(email, password);
    },

    signUpUserPassword: async (username, email, password, isTeacher) => {
        return await signUpUserPassword(username, email, password, isTeacher);
    },

    logOut: async () => {
        await logoutAPI();
        set({ getSessionUser: null });
    },

    updateData: async () => {
        let currentUser = null;
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
            set({ getSessionUser: null });
            return null;
        }

        const userId = data.session.user.id;

        const { data: role } = await AuthQuery().isChekedRoleDetail(userId);

        if (role.isStudent) {
            const { data: user } = await StudentQuery().studentsDetail(userId);
            currentUser = user;
        } else if (role.isTeacher) {
            const { data: user } = await TeacherQuery().teachersDetail(userId);
            currentUser = user;
        }

        const sessionUser: IUser = {
            currentUser,
            role: role.isTeacher ? "tutors" : role.isStudent ? "student" : null,
            user: data.session.user,
        };

        set({ getSessionUser: sessionUser });
        return sessionUser;
    },
}));
