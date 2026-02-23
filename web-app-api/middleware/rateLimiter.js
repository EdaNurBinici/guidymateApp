const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // 100 istek
  message: { message: 'Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // 5 giriş denemesi
  message: { message: 'Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.' },
  skipSuccessfulRequests: true, // Başarılı istekleri sayma
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 dakika
  max: 10, // 10 AI isteği
  message: { message: 'AI limitine ulaştınız. Lütfen 1 dakika bekleyin.' },
});

module.exports = {
  generalLimiter,
  authLimiter,
  aiLimiter
};
