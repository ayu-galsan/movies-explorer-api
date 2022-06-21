const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  jwt, NotFoundAuthorizationText,
} = require('../utils/constans');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(NotFoundAuthorizationText));
    return;
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    next(new UnauthorizedError(NotFoundAuthorizationText));
    return;
  }

  req.user = payload;

  next();
};
