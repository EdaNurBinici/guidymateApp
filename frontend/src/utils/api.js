import { API_URL } from '../config';

/**
 * Gelişmiş API çağrı fonksiyonu
 * - HTTP status kodlarını kontrol eder
 * - Detaylı hata mesajları döner
 * - Token yönetimi yapar
 * - Network hatalarını yakalar
 */
export async function apiCall(url, method = 'GET', body = null) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };

    // Token varsa ekle
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    // Body varsa ekle
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${url}`, options);

    // HTTP status kontrolü
    if (!response.ok) {
      // 401 Unauthorized - Token geçersiz
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
        throw new Error('Oturum süresi doldu. Lütfen tekrar giriş yap.');
      }

      // 403 Forbidden
      if (response.status === 403) {
        throw new Error('Bu işlem için yetkiniz yok.');
      }

      // 404 Not Found
      if (response.status === 404) {
        throw new Error('İstenen kaynak bulunamadı.');
      }

      // 500 Server Error
      if (response.status >= 500) {
        throw new Error('Sunucu hatası. Lütfen daha sonra tekrar dene.');
      }

      // Diğer hatalar - Backend'den gelen mesajı al
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status} hatası`);
    }

    // Başarılı response - JSON parse et
    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    // Network hatası veya diğer hatalar
    if (error.message === 'Failed to fetch') {
      return {
        success: false,
        error: 'Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.',
      };
    }

    // Diğer hatalar
    return {
      success: false,
      error: error.message || 'Bir hata oluştu.',
    };
  }
}

/**
 * Logger service - Production'da console.log'ları devre dışı bırakır
 */
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
    // Production'da hata tracking servisi kullanılabilir (Sentry, etc.)
  },
  warn: (...args) => {
    if (import.meta.env.DEV) {
      console.warn(...args);
    }
  },
};
