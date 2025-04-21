

import { createClientSupaBase } from './supabase';

const supabase = createClientSupaBase();
interface AuthService {
  email: string;
  password: string;
}

export const signUpNewUser = async ({ email, password }: AuthService) => {
  await supabase.auth.signInWithPassword({
    email: email,
    password: password,

  });
};