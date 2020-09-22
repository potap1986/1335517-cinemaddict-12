import {SHAKE_ANIMATION_TIMEOUT, FilmsForRating} from '../const.js';

export const shakeEffect = (element) => {
  element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
  setTimeout(() => {
    element.style.animation = ``;
  }, SHAKE_ANIMATION_TIMEOUT);
};

export const updateWatchingDate = (film, update) => {
  if (film.isWatched !== update.isWatched) {
    const obj = {watchingDate: update.isWatched ? new Date() : null};
    return obj;
  } else {
    return {};
  }
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return currentDate;
};

export const getWatchedFilmsCount = (films) => {
  return films.filter((film) => film.isWatched).length;
};

export const getProfileRating = (films) => {
  const watchedFilmsCount = getWatchedFilmsCount(films);

  switch (true) {
    case (watchedFilmsCount >= FilmsForRating.NOVICE.MIN && watchedFilmsCount <= FilmsForRating.NOVICE.MAX):
      return `novice`;
    case (watchedFilmsCount >= FilmsForRating.FAN.MIN && watchedFilmsCount <= FilmsForRating.FAN.MAX):
      return `fan`;
    case (watchedFilmsCount >= FilmsForRating.MOVIE_BUFF.MIN):
      return `movie buff`;
    default:
      return ``;
  }
};

export const getFilmsDuration = (films) => {
  return films.reduce((count, film) => {
    return count + film.duration;
  }, 0);
};

export const getAllGenres = (films) => {
  const allGenres = [];
  films.map((film) => allGenres.push(film.genres));
  const countObject = allGenres.flat().reduce((array, genre) => {
    array[genre] = array[genre] || 0;
    array[genre]++;
    return array;
  }, {});

  return countObject;
};

export const getTopGenre = (films) => {
  const genresObject = getAllGenres(films);

  const maxCount = Math.max(...Object.values(genresObject));

  const topGenre = ((obj, value) => {
    return Object.keys(obj)[Object.values(obj).indexOf(value)];
  });

  return topGenre(genresObject, maxCount);
};
