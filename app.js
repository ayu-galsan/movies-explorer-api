require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3001 } = process.env;

const mongoose = require('mongoose');

const { routes } = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralErrorHandler } = require('./middlewares/centralErrorHandler');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(centralErrorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/moviedb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`Слушаем ${PORT} порт`);
  });
}

main();
