// Simulación de API - En un proyecto real se harían peticiones HTTP al backend
const users = [
    { id: 1, email: 'admin@club.com', password: 'admin123', name: 'Administrador', role: 'admin' },
    { id: 2, email: 'cliente@club.com', password: 'cliente123', name: 'Juan Pérez', role: 'user' }
  ];
  
  export const loginUser = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 1000);
    });
  };
  
  export const registerUser = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...userData,
          id: users.length + 1,
          role: 'user' // Todos los registros son clientes
        };
        users.push(newUser);
        resolve(newUser);
      }, 1000);
    });
  };