// Error Handler Utility

export const handleApiError = (error, customMessage = null) => {
  console.error('API Error:', error);
  
  // Network error
  if (!error.response) {
    return customMessage || 'Bağlantı hatası! Sunucuya ulaşılamıyor.';
  }
  
  // HTTP errors
  const status = error.response?.status;
  
  switch (status) {
    case 400:
      return error.response?.data?.message || 'Geçersiz istek!';
    case 401:
      return 'Oturum süreniz doldu. Lütfen tekrar giriş yapın.';
    case 403:
      return 'Bu işlem için yetkiniz yok!';
    case 404:
      return 'İstenen kaynak bulunamadı!';
    case 500:
      return 'Sunucu hatası! Lütfen daha sonra tekrar deneyin.';
    default:
      return customMessage || 'Bir hata oluştu!';
  }
};

export const isNetworkError = (error) => {
  return !error.response && error.message === 'Network Error';
};
