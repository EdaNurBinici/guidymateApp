
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const isDevelopment = import.meta.env.MODE === 'development';
export const isProduction = import.meta.env.MODE === 'production';

if (!API_URL) {
  console.error('❌ API_URL is not defined! Check your .env file.');
}

if (isDevelopment) {
  console.log('🔧 Development Mode');
  console.log('📡 API URL:', API_URL);
}
