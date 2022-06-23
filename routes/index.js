const express = require('express');

const routes = express.Router();
const userRouter = require('./users');
const movieRouter = require('./movie');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { NotFoundPageText } = require('../utils/constans');
const { createUser, login } = require('../controllers/user');
const { validateSignUp, validateSignIn } = require('../middlewares/validate');

routes.post('/signup', validateSignUp, createUser);

routes.post('/signin', validateSignIn, login);

routes.use('/users', auth, userRouter);
routes.use('/movies', auth, movieRouter);
routes.use(auth, (req, res, next) => {
  next(new NotFoundError(NotFoundPageText));
});

module.exports = {
  routes,
};
