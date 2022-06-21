const { celebrate, Joi } = require('celebrate');

const validator = require('validator');

const urlValidator = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.message('Некорректно передан URL адрес');
  }
  return value;
};

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidator),
    trailerLink: Joi.string().required().custom(urlValidator),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(urlValidator),
    movieId: Joi.number().required(),
  }),
});

const validateDeleteMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  validateCreateMovie,
  validateDeleteMovieById,
  validateUpdateUser,
};
