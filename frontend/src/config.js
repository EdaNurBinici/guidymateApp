// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Environment check
export const isDevelopment = import.meta.env.MODE === 'development';
export const isProduction = import.meta.env.MODE === 'production';

// Validate API URL
if (!API_URL) {
  console.error('❌ API_URL is not defined! Check your .env file.');
}

// Log configuration in development
if (isDevelopment) {
  console.log('🔧 Development Mode');
  console.log('📡 API URL:', API_URL);
}
