export const ROLES = {
  ADMIN: 'admin',
  TUTOR: 'tutor',
  ALUMNO: 'alumno' // Agregado para futura expansión
};

export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 3,
  [ROLES.TUTOR]: 2,
  [ROLES.ALUMNO]: 1
};

// Función para verificar permisos
export const hasPermission = (userRole, requiredRole) => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

// Función para obtener el nombre legible del rol
export const getRoleName = (role) => {
  const names = {
    [ROLES.ADMIN]: 'Administrador',
    [ROLES.TUTOR]: 'Tutor',
    [ROLES.ALUMNO]: 'Alumno'
  };
  return names[role] || 'Usuario';
};