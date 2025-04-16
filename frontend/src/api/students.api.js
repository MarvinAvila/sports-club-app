import { supabase } from '../lib/supabaseClient';

export async function getAllStudents() {
  const { data, error } = await supabase.from('students').select('*');
  if (error) throw error;
  return data;
}
