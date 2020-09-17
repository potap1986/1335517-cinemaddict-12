export const getRandomBool = (chance = 0.5) => Math.random() < chance;

export const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandomNumber = (min = 0, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomUniqueArray = (length = 5) => [...new Set(Array.from({length}, getRandomNumber))];

const getRandomSorting = () => Math.random() - 0.5;

export const getRandomSet = (items, num = 3) =>
  [...new Set(items.sort(getRandomSorting).slice(0, num))];

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

export const getWatchedFilmsCount = (films) => {
  return films.filter((film) => film.isWatched).length;
};

export const getProfileRating = (films) => {
  const watchedFilmsCount = getWatchedFilmsCount(films);

  switch (true) {
    case (watchedFilmsCount >= 1 && watchedFilmsCount <= 10):
      return `novice`;
    case (watchedFilmsCount >= 11 && watchedFilmsCount <= 20):
      return `fan`;
    case (watchedFilmsCount >= 21):
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

  const countObject = allGenres.flat().reduce((a, c) => {
    a[c] = a[c] || 0;
    a[c]++;
    return a;
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
