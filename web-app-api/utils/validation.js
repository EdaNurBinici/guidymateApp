const Joi = require('joi');

// Validation schemas
const schemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'string.empty': 'İsim gerekli',
      'string.min': 'İsim en az 2 karakter olmalı',
      'string.max': 'İsim en fazla 50 karakter olabilir'
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email gerekli',
      'string.email': 'Geçerli bir email adresi girin'
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Şifre gerekli',
      'string.min': 'Şifre en az 6 karakter olmalı'
    })
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email gerekli',
      'string.email': 'Geçerli bir email adresi girin'
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Şifre gerekli'
    })
  }),

  profile: Joi.object({
    age: Joi.number().min(10).max(100).required(),
    city: Joi.string().max(50).required(),
    is_student: Joi.boolean().required(),
    grade: Joi.string().max(50).allow('', null),
    university: Joi.string().max(100).allow('', null),
    uni_type: Joi.string().max(50).allow('', null),
    department: Joi.string().max(100).allow('', null),
    is_working: Joi.boolean().required(),
    sector: Joi.string().max(100).allow('', null),
    position: Joi.string().max(100).allow('', null),
    interests: Joi.string().min(10).max(500).required().messages({
      'string.min': 'Hedef en az 10 karakter olmalı',
      'string.max': 'Hedef en fazla 500 karakter olabilir'
    }),
    study_hours: Joi.number().min(0).max(24).required()
  }),

  note: Joi.object({
    title: Joi.string().min(1).max(200).required().messages({
      'string.empty': 'Başlık gerekli',
      'string.max': 'Başlık en fazla 200 karakter olabilir'
    }),
    content: Joi.string().max(5000).allow('', null)
  })
};

// Validation middleware
const validate = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return res.status(500).json({ message: 'Validation schema not found' });
    }

    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ 
        message: 'Doğrulama hatası', 
        errors 
      });
    }
    
    next();
  };
};

module.exports = { validate, schemas };
