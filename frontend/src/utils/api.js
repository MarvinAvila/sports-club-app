export const apiRequest = async (method, endpoint, data = null) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    const fullUrl = `${baseUrl}${endpoint}`;
    
    // Obtener el token del estado de autenticación o localStorage
    const authState = JSON.parse(localStorage.getItem('auth')) || {};
    const token = authState.token;
  
    if (!token) {
      throw new Error('No authentication token found');
    }
  
    const options = {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  
    if (data) {
      options.body = JSON.stringify(data);
    }
  
    try {
      const response = await fetch(fullUrl, options);
      
      // Manejo de respuestas no JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Invalid server response');
      }
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.error || responseData.message || 'Request failed');
      }
  
      return responseData;
    } catch (error) {
      console.error('API request error:', {
        endpoint,
        error: error.message
      });
      throw error;
    }
  };