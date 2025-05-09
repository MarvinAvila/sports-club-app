create table public.alumnos (
  id uuid not null default extensions.uuid_generate_v4 (),
  fecha_nacimiento date null,
  genero text null,
  foto_url text null,
  alergias text null,
  observaciones_medicas text null,
  nombre text not null,
  apellido_paterno text not null,
  apellido_materno text null,
  curp text null,
  tipo_sangre text null,
  lugar_nacimiento text null,
  nivel_estudios text null,
  municipio_residencia text null,
  codigo_postal text null,
  numero_camiseta integer null,
  cirugias_previas text null,
  afecciones_medicas text null,
  nombre_padres text null,
  telefonos_contacto text null,
  documento_curp_url text null,
  acta_nacimiento_url text null,
  credencial_escolar_url text null,
  ine_tutor_url text null,
  constraint alumnos_pkey primary key (id),
  constraint alumnos_curp_key unique (curp)
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

create table public.documentos_alumno (
  id uuid not null default extensions.uuid_generate_v4 (),
  alumno_id uuid not null,
  tipo_documento text not null,
  url text not null,
  subido_en timestamp with time zone null default now(),
  constraint documentos_alumno_pkey primary key (id),
  constraint documentos_alumno_alumno_id_fkey foreign KEY (alumno_id) references alumnos (id) on delete CASCADE,
  constraint documentos_alumno_tipo_documento_check check (
    (
      tipo_documento = any (
        array[
          'CURP'::text,
          'ACTA_NACIMIENTO'::text,
          'CREDENCIAL_ESCOLAR'::text,
          'INE_TUTOR'::text,
          'FOTO'::text
        ]
      )
    )
  )
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
  constraint notificaciones_tutor_id_fkey foreign KEY (tutor_id) references tutores (id) on delete CASCADE,
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

create table public.tutores (
  id uuid not null,
  nombre text not null,
  apellido_paterno text not null,
  apellido_materno text not null,
  email text not null,
  telefono text null,
  ine_url text null,
  parentesco text null,
  creado_en timestamp with time zone null default now(),
  actualizado_en timestamp with time zone null default now(),
  contraseña_hash text null,
  constraint tutores_pkey primary key (id),
  constraint tutores_email_key unique (email),
  constraint tutores_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.tutores_alumnos (
  tutor_id uuid not null,
  alumno_id uuid not null,
  parentesco text not null,
  constraint tutores_alumnos_pkey primary key (tutor_id, alumno_id),
  constraint tutores_alumnos_alumno_id_fkey foreign KEY (alumno_id) references alumnos (id) on delete CASCADE,
  constraint tutores_alumnos_tutor_id_fkey foreign KEY (tutor_id) references tutores (id) on delete CASCADE
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
  constraint usuarios_rol_check check ((rol = 'admin'::text))
) TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.documentos_alumno (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  alumno_id uuid NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE,
  tipo_documento text NOT NULL CHECK (
    tipo_documento IN ('CURP', 'ACTA_NACIMIENTO', 'CREDENCIAL_ESCOLAR', 'INE_TUTOR', 'FOTO')
  ),
  url text NOT NULL,
  subido_en timestamptz DEFAULT now()
);

CREATE TABLE pre_registros (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  auth_id UUID NOT NULL,
  tutor_data JSONB NOT NULL,
  alumno_data JSONB NOT NULL,
  documentos_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT fk_auth_user FOREIGN KEY (auth_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_pre_registros_auth_id ON pre_registros (auth_id);
CREATE INDEX idx_pre_registros_expires ON pre_registros (expires_at);