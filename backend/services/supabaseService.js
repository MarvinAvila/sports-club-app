import { supabaseAdmin } from '../config/supabaseClient.js';

export const getSensitiveData = async () => {
  return await supabaseAdmin
    .from('pagos')
    .select('*');
}