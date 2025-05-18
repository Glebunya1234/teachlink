import { createClient } from '@/utils/supabase/client';

export const IsCheckedUser = async () => {
  const supabase = await createClient()
  const result = await supabase.auth.getUser();
  return result.data
};
