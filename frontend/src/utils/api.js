import { API_URL } from '../config';


export async function apiCall(url, method = 'GET', body = null) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${url}`, options);

    if (!response.ok) {

      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
        throw new Error('Oturum süresi doldu. Lütfen tekrar giriş yap.');
      }

      if (response.status === 403) {
        throw new Error('Bu işlem için yetkiniz yok.');
      }

      if (response.status === 404) {
        throw new Error('İstenen kaynak bulunamadı.');
      }

      if (response.status >= 500) {
        throw new Error('Sunucu hatası. Lütfen daha sonra tekrar dene.');
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status} hatası`);
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error) {

    if (error.message === 'Failed to fetch') {
      return {
        success: false,
        error: 'Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.',
      };
    }

    return {
      success: false,
      error: error.message || 'Bir hata oluştu.',
    };
  }
}


export const logger = {
  log: (...args) => {
    if (import.meta.env.DEV) {
      console.log(...args);
    }
  },
  error: (...args) => {
    if (import.meta.env.DEV) {
      console.error(...args);
    }

  },
  warn: (...args) => {
    if (import.meta.env.DEV) {
      console.warn(...args);
    }
  },
};
