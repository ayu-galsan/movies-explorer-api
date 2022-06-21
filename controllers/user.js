const bcrypt = require('bcrypt');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const {
  NotFoundIdUserErrorText,
  OK_CODE,
  ValidationErrorText,
  NOT_FOUND_ERROR_CODE,
  NotFoundLoginPasswordText,
  SALT_ROUNDS,
  CREATED_OK_CODE,
  DUBLICATE_MONGOOSE_ERROR_CODE,
  UserExistErrorText,
  jwt,
} = require('../utils/constans');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = async (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      email, password: hash, name,
    });
    const savedUser = await user.save();
    const { password: removedPassword, ...result } = savedUser.toObject();
    res.status(CREATED_OK_CODE).send(result);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(ValidationErrorText));
      return;
    }
    if (err.code === DUBLICATE_MONGOOSE_ERROR_CODE) {
      next(new ConflictError(UserExistErrorText));
      return;
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new UnauthorizedError(NotFoundLoginPasswordText));
      return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      next(new UnauthorizedError(NotFoundLoginPasswordText));
      return;
    }
    const token = jwt.sign({ id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
    res.status(OK_CODE).send({ token });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new UnauthorizedError(ValidationErrorText));
      return;
    }
    next(err);
  }
};

const getMyUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      next(new NotFoundError(NotFoundIdUserErrorText));
      return;
    }
    res.status(OK_CODE).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(ValidationErrorText));
      return;
    }
    if (err.statusCode === NOT_FOUND_ERROR_CODE) {
      next(new NotFoundError(NotFoundIdUserErrorText));
      return;
    }
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(OK_CODE).send(updateUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(ValidationErrorText));
      return;
    }
    next(err);
  }
};

module.exports = {
  createUser,
  login,
  getMyUser,
  updateProfile,
};
