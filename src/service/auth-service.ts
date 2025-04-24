 


import { createClient } from '@/utils/supabase/client';


interface AuthService {
  email: string;
  password: string;
}


export const IsCheckedUser = async () => {
  const supabase = await createClient()
  const result = await supabase.auth.getUser();
  return result.data
};
