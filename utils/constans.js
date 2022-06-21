const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const OK_CODE = 200;
const CREATED_OK_CODE = 201;
const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const SERVER_ERROR_CODE = 500;
const DUBLICATE_MONGOOSE_ERROR_CODE = 11000;
const ServerErrorText = 'На сервере произошла ошибка';
const NotFoundIdUserErrorText = 'Пользователь с таким id не найден в базе';
const ValidationErrorText = 'Переданы некорректные данные';
const NotFoundIdFilmErrorText = 'Фильм с указанным _id не найден';
const NotFoundPageText = 'Страница не найдена';
const NotFoundAuthorizationText = 'Нет доступа - необходима авторизация';
const NotFoundLoginPasswordText = 'Неправильный логин или пароль';
const UserExistErrorText = 'Пользователь с такими данными уже существует';
const NotDeleteFilmErrorText = 'Невозможно удалить чужой фильм';

module.exports = {
  jwt,
  SALT_ROUNDS,
  OK_CODE,
  CREATED_OK_CODE,
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  SERVER_ERROR_CODE,
  DUBLICATE_MONGOOSE_ERROR_CODE,
  ServerErrorText,
  NotFoundIdUserErrorText,
  ValidationErrorText,
  NotFoundIdFilmErrorText,
  NotFoundPageText,
  NotFoundAuthorizationText,
  NotFoundLoginPasswordText,
  UserExistErrorText,
  NotDeleteFilmErrorText,
};
