const express = require('express');

const userRouter = express.Router();
const {
  getMyUser,
  updateProfile,
} = require('../controllers/user');
const { validateUpdateUser } = require('../middlewares/validate');

userRouter.get('/me', getMyUser);

userRouter.patch('/me', validateUpdateUser, updateProfile);

module.exports = userRouter;
