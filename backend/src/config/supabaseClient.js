import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config(); 

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    throw new Error('Faltan variables de entorno SUPABASE_URL o SUPABASE_SERVICE_KEY');
  }
  
  export const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { auth: { persistSession: false } }
  );