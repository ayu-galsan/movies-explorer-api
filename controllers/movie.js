const Movie = require('../models/movie');

const {
  OK_CODE, ValidationErrorText, CREATED_OK_CODE, NotFoundIdFilmErrorText, NotDeleteFilmErrorText,
} = require('../utils/constans');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({});
    res.status(OK_CODE).send(movie);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const {
      country, director, duration, year, description,
      image, trailerLink, nameRU, nameEN, thumbnail, movieId,
    } = req.body;
    const movie = new Movie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    res.status(CREATED_OK_CODE).send(await movie.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(`${ValidationErrorText} при создании фильма`));
      return;
    }
    next(err);
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      next(new NotFoundError(NotFoundIdFilmErrorText));
      return;
    }
    if (!movie.owner.equals(req.user.id)) {
      next(new ForbiddenError(NotDeleteFilmErrorText));
      return;
    }
    res.status(OK_CODE).send(await movie.deleteOne());
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(`${ValidationErrorText} при удалении фильма`));
      return;
    }
    next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
