const { SERVER_ERROR_CODE, ServerErrorText } = require('../utils/constans');

const centralErrorHandler = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR_CODE
        ? ServerErrorText
        : message,
    });
  next();
};

module.exports = {
  centralErrorHandler,
};
