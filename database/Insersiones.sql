INSERT INTO public.alumnos (nombre, fecha_nacimiento, genero, foto_url, alergias, observaciones_medicas) VALUES
('Juan Pérez', '2015-03-12', 'masculino', 'https://ejemplo.com/fotos/juan.jpg', 'Ninguna', 'Usa lentes'),
('María González', '2016-07-24', 'femenino', 'https://ejemplo.com/fotos/maria.jpg', 'Penicilina', 'Asma leve'),
('Carlos Sánchez', '2014-11-05', 'masculino', NULL, 'Mariscos', NULL),
('Ana López', '2015-09-18', 'femenino', 'https://ejemplo.com/fotos/ana.jpg', 'Polvo', 'Dermatitis atópica'),
('Luis Ramírez', '2016-01-30', 'masculino', NULL, NULL, 'Control anual cardiólogo');

INSERT INTO public.deportes (nombre, descripcion, horario, entrenador, cupo_maximo, precio_inscripcion) VALUES
('Fútbol', 'Equipos de 11 jugadores', 'Lunes y Miércoles 16:00-18:00', 'Roberto Mendoza', 22, 500.00),
('Baloncesto', 'Cancha completa', 'Martes y Jueves 15:00-17:00', 'Laura Jiménez', 15, 450.00),
('Natación', 'Clases en alberca semiolímpica', 'Viernes 14:00-16:00', 'Fernanda Castro', 10, 600.00),
('Voleibol', 'Equipos mixtos', 'Miércoles y Viernes 17:00-19:00', 'Jorge Domínguez', 12, 400.00),
('Atletismo', 'Entrenamiento de pista', 'Lunes a Viernes 07:00-08:00', 'Sofía Hernández', 20, 350.00);

INSERT INTO public.inscripciones (alumno_id, deporte_id, temporada, estado, comprobante_pago_url) VALUES
((SELECT id FROM alumnos WHERE nombre = 'Juan Pérez'), (SELECT id FROM deportes WHERE nombre = 'Fútbol'), '2025-1', 'activa', 'https://ejemplo.com/comprobantes/juan-futbol.pdf'),
((SELECT id FROM alumnos WHERE nombre = 'María González'), (SELECT id FROM deportes WHERE nombre = 'Baloncesto'), '2025-1', 'activa', 'https://ejemplo.com/comprobantes/maria-baloncesto.pdf'),
((SELECT id FROM alumnos WHERE nombre = 'Carlos Sánchez'), (SELECT id FROM deportes WHERE nombre = 'Natación'), '2025-1', 'pendiente', NULL),
((SELECT id FROM alumnos WHERE nombre = 'Ana López'), (SELECT id FROM deportes WHERE nombre = 'Voleibol'), '2025-1', 'activa', 'https://ejemplo.com/comprobantes/ana-voleibol.pdf'),
((SELECT id FROM alumnos WHERE nombre = 'Luis Ramírez'), (SELECT id FROM deportes WHERE nombre = 'Atletismo'), '2025-1', 'vencida', 'https://ejemplo.com/comprobantes/luis-atletismo.pdf');

INSERT INTO public.tutores_alumnos (tutor_id, alumno_id, parentesco) VALUES
((SELECT id FROM usuarios WHERE email = 'marvin.rivera14@unach.mx'), (SELECT id FROM alumnos WHERE nombre = 'Juan Pérez'), 'Padre'),
((SELECT id FROM usuarios WHERE email = 'marvin.rivera14@unach.mx'), (SELECT id FROM alumnos WHERE nombre = 'María González'), 'Tutor legal'),
((SELECT id FROM usuarios WHERE email = 'marvinavila2002@gmail.com'), (SELECT id FROM alumnos WHERE nombre = 'Carlos Sánchez'), 'Padre'),
((SELECT id FROM usuarios WHERE email = 'marvinavila2002@gmail.com'), (SELECT id FROM alumnos WHERE nombre = 'Ana López'), 'Madre'),
((SELECT id FROM usuarios WHERE email = 'marvin.rivera14@unach.mx'), (SELECT id FROM alumnos WHERE nombre = 'Luis Ramírez'), 'Tío');

INSERT INTO public.pagos (inscripcion_id, monto, metodo_pago, fecha_pago, recibido_por, comprobante_url) VALUES
((SELECT id FROM inscripciones WHERE alumno_id = (SELECT id FROM alumnos WHERE nombre = 'Juan Pérez')), 500.00, 'transferencia', '2025-01-15', (SELECT id FROM usuarios WHERE email = 'marvin.rivera14@unach.mx'), 'https://ejemplo.com/pagos/juan-001.pdf'),
((SELECT id FROM inscripciones WHERE alumno_id = (SELECT id FROM alumnos WHERE nombre = 'María González')), 450.00, 'efectivo', '2025-01-16', (SELECT id FROM usuarios WHERE email = 'marvin.rivera14@unach.mx'), 'https://ejemplo.com/pagos/maria-001.pdf'),
((SELECT id FROM inscripciones WHERE alumno_id = (SELECT id FROM alumnos WHERE nombre = 'Ana López')), 400.00, 'tarjeta', '2025-01-18', (SELECT id FROM usuarios WHERE email = 'marvinavila2002@gmail.com'), 'https://ejemplo.com/pagos/ana-001.pdf');

INSERT INTO public.notificaciones (tutor_id, mensaje, tipo, leida) VALUES
((SELECT id FROM usuarios WHERE email = 'marvin.rivera14@unach.mx'), 'Recordatorio: Pago pendiente para Juan Pérez', 'recordatorio', false),
((SELECT id FROM usuarios WHERE email = 'marvinavila2002@gmail.com'), 'Pago recibido para Ana López', 'pago', true),
((SELECT id FROM usuarios WHERE email = 'marvin.rivera14@unach.mx'), 'Horario de fútbol modificado para esta semana', 'general', false),
((SELECT id FROM usuarios WHERE email = 'marvinavila2002@gmail.com'), 'Documentación médica de Carlos Sánchez incompleta', 'general', false);