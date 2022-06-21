const express = require('express');

const routes = express.Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const movieRouter = require('./movie');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { NotFoundPageText } = require('../utils/constans');
const { createUser, login } = require('../controllers/user');

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routes.use('/users', auth, userRouter);
routes.use('/movies', auth, movieRouter);
routes.use((req, res, next) => {
  next(new NotFoundError(NotFoundPageText));
});

module.exports = {
  routes,
};
