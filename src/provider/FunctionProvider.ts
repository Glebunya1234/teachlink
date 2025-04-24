import { AuthError, AuthResponse, AuthTokenResponse, OAuthResponse } from "@supabase/supabase-js";


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
export const logOut = async (): Promise<TLogOut> => {
    return createClient().auth.signOut();
};