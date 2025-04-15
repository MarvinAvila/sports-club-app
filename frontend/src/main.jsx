import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/index.css';
import { supabase } from '@/lib/supabaseClient';

// Verifica sesión al cargar
supabase.auth.getSession().then(({ data: { session } }) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <App initialSession={session} />
    </React.StrictMode>
  );
});