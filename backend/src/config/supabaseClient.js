import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: new URL("C:/Users/marvi/OneDrive/Documentos/6 semestre Unach/Taller de Desarrollo 4/sports-club-app/backend/.env", import.meta.url).pathname });

// Debug: Verificar variables
console.log("[Supabase] Verificando configuración...");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("[Supabase] Error de configuración:");
  console.error("SUPABASE_URL:", supabaseUrl, process.env.SUPABASE_URL);
  console.error(
    "SUPABASE_SERVICE_KEY:",
    supabaseKey ? "*** presente ***" : "FALTANTE"
  );
  throw new Error(
    "Configuración incompleta de Supabase. Verifica tu archivo .env"
  );
}

console.log("[Supabase] Configuración validada - Creando cliente...");

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});
