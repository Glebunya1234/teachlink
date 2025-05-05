import { AuthError, AuthResponse, AuthTokenResponse, OAuthResponse } from "@supabase/supabase-js";


import { Students } from "@/gen/Students";
import { Teachers } from "@/gen/Teachers";
import { createClient } from "@/utils/supabase/client";

export type TSignIn = OAuthResponse | AuthTokenResponse;
export type TSignUp = AuthResponse;
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TLogOut = {
    error: AuthError | null;
};

export const signInUserPassword = async (email: string, password: string): Promise<TSignIn> => {
    return await createClient().auth.signInWithPassword({
        email: email,
        password: password,

    });
};
export const signUpUserPassword = async (username: string, email: string, password: string, isTeacher: "teacher" | "student",): Promise<TSignUp> => {

    const result = await createClient().auth.signUp({
        email: email,
        password: password,
    })
    if (result.data.user === null || !result.data.user.email) {
        return result;
    }
    if (isTeacher == "teacher") {
        new Teachers({
            baseURL: "http://localhost:5204",
            headers: {
                Authorization: `Bearer ${result.data.session?.access_token}`,
            },
        }).teachersCreate({
            uid: result.data.user.id,
            email: result.data.user.email,
            full_name: username,
        });
    }
    else {
        new Students({
            baseURL: "http://localhost:5204",
            headers: {
                Authorization: `Bearer ${result.data.session?.access_token}`,
            },
        }).studentsCreate({
            uid: result.data.user.id,
            email: result.data.user.email,
            full_name: username,
        });
    }
    return result;
}

export const logOut = async (): Promise<TLogOut> => {
    return createClient().auth.signOut();
};