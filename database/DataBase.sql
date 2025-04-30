--esta es mi base de datos en supabase : 

create table public.alumnos (
  id uuid not null default extensions.uuid_generate_v4 (),
  nombre text not null,
  fecha_nacimiento date null,
  genero text null,
  foto_url text null,
  alergias text null,
  observaciones_medicas text null,
  constraint alumnos_pkey primary key (id)
) TABLESPACE pg_default;

create table public.deportes (
  id uuid not null default extensions.uuid_generate_v4 (),
  nombre text not null,
  descripcion text null,
  horario text not null,
  entrenador text not null,
  cupo_maximo integer null,
  precio_inscripcion numeric(10, 2) null,
  constraint deportes_pkey primary key (id)
) TABLESPACE pg_default;

create table public.inscripciones (
  id uuid not null default extensions.uuid_generate_v4 (),
  alumno_id uuid null,
  deporte_id uuid null,
  temporada text not null,
  fecha_inscripcion timestamp with time zone null default now(),
  estado text not null,
  comprobante_pago_url text null,
  constraint inscripciones_pkey primary key (id),
  constraint inscripciones_alumno_id_fkey foreign KEY (alumno_id) references alumnos (id) on delete CASCADE,
  constraint inscripciones_deporte_id_fkey foreign KEY (deporte_id) references deportes (id) on delete set null,
  constraint inscripciones_estado_check check (
    (
      estado = any (
        array[
          'pendiente'::text,
          'activa'::text,
          'vencida'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create table public.notificaciones (
  id uuid not null default extensions.uuid_generate_v4 (),
  tutor_id uuid null,
  mensaje text not null,
  tipo text not null,
  leida boolean null default false,
  creada_en timestamp with time zone null default now(),
  constraint notificaciones_pkey primary key (id),
  constraint notificaciones_tutor_id_fkey foreign KEY (tutor_id) references usuarios (id) on delete CASCADE,
  constraint notificaciones_tipo_check check (
    (
      tipo = any (
        array[
          'pago'::text,
          'recordatorio'::text,
          'general'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create table public.pagos (
  id uuid not null default extensions.uuid_generate_v4 (),
  inscripcion_id uuid null,
  monto numeric(10, 2) not null,
  metodo_pago text not null,
  fecha_pago date not null,
  recibido_por uuid null,
  comprobante_url text null,
  constraint pagos_pkey primary key (id),
  constraint pagos_inscripcion_id_fkey foreign KEY (inscripcion_id) references inscripciones (id) on delete CASCADE,
  constraint pagos_recibido_por_fkey foreign KEY (recibido_por) references usuarios (id)
) TABLESPACE pg_default;

create table public.tutores_alumnos (
  tutor_id uuid not null,
  alumno_id uuid not null,
  parentesco text not null,
  constraint tutores_alumnos_pkey primary key (tutor_id, alumno_id),
  constraint tutores_alumnos_alumno_id_fkey foreign KEY (alumno_id) references alumnos (id) on delete CASCADE,
  constraint tutores_alumnos_tutor_id_fkey foreign KEY (tutor_id) references usuarios (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.usuarios (
  id uuid not null default extensions.uuid_generate_v4 (),
  email text not null,
  contraseña_hash text not null,
  rol text not null,
  nombre text not null,
  telefono text null,
  creado_en timestamp with time zone not null default now(),
  auth_id uuid null,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_email_key unique (email),
  constraint usuarios_auth_id_fkey foreign KEY (auth_id) references auth.users (id) on delete CASCADE,
  constraint usuarios_rol_check check ((rol = any (array['admin'::text, 'tutor'::text])))
) TABLESPACE pg_default;