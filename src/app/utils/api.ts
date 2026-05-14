/**
 * API Utility for CareerDream
 * Handles environment-based URLs and automatic session management
 */

const getBaseUrl = () => {
  // If production, use the environment variable or fallback to subdomain
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_BASE_URL || 'https://api.careerdream.in/api';
  }

  return '/api';
};

export const BASE_URL = getBaseUrl();

/**
 * Enhanced fetch wrapper that includes auth tokens and handles common errors
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Session expired or unauthorized');
      }
      
      let errorMessage = `API Error: ${response.status}`;
      const responseText = await response.text();
      
      try {
        if (responseText) {
          const errorData = JSON.parse(responseText);
          if (errorData.message) errorMessage = errorData.message;
          else if (errorData.error) errorMessage = errorData.error;
        }
      } catch (e) {
        if (responseText) errorMessage = responseText;
      }
      
      throw new Error(errorMessage);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error(`API Fetch Error [${url}]:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint: string) => apiFetch(endpoint, { method: 'GET' }),
  post: (endpoint: string, data: any) => apiFetch(endpoint, { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  put: (endpoint: string, data: any) => apiFetch(endpoint, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  patch: (endpoint: string, data: any) => apiFetch(endpoint, { 
    method: 'PATCH', 
    body: JSON.stringify(data) 
  }),
  delete: (endpoint: string) => apiFetch(endpoint, { method: 'DELETE' }),
  download: async (endpoint: string, filename: string) => {
    const token = localStorage.getItem('authToken');
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) throw new Error('Download failed');
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
