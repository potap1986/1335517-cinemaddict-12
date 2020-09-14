import {Time} from './const.js';
import {getRandomBool, getRandomItem, getRandomNumber, getRandomUniqueArray, getRandomSet, generateId} from "./utils/common.js";

const FILMS_NUM = 20;

const filmTitles = [
  `Shawshank Redemtion`,
  `The Green Mile`,
  `Forrest Gump`,
  `Schindlers list`,
  `1 + 1`,
  `Inception`,
  `Leon`,
  `The Lion King`,
  `Fight club`,
  `Godfather`,
  `Pulp fiction`,
  `Prestige`,
  `A beautiful mind`,
  `Interstellar`,
  `Gladiator`,
];

const filmPosters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const sentences = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const GENRES = [
  `Drama`,
  `Film-Noir`,
  `Mystery`,
  `Musical`,
  `Western`,
  `Comedy`,
  `Cartoon`,
];

const PEOPLE = [
  `Tim Macoveev`,
  `John Doe`,
  `Ivan Ivanov`,
  `Sergey Petrov`,
  `Nikolai Sergeev`,
  `Quentin Tarantino`,
  `Penelopa Cruz`,
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Mary Beth`,
  `Dan Duryea`,
];

const COUNTRIES = [
  `USA`,
  `Italy`,
  `Russia`,
  `India`,
  `Spain`,
  `France`,
];

const EMOTIONS = [
  `angry`,
  `puke`,
  `smile`,
  `sleeping`,
];

const AGE_LIMITS = [14, 16, 18, 21];

const getComment = () => ({
  id: generateId(),
  emotion: getRandomItem(EMOTIONS),
  text: getRandomItem(sentences),
  author: getRandomItem(PEOPLE),
  date: Date.now() - getRandomNumber(0, Time.MONTH),
});

const getComments = (num = 5) => Array.from({length: num}, getComment);

const getFilm = () => ({
  id: generateId(),
  title: getRandomItem(filmTitles),
  director: getRandomItem(PEOPLE),
  writers: getRandomSet(PEOPLE, getRandomNumber(1, 3)),
  actors: getRandomSet(PEOPLE, getRandomNumber(1, 3)),
  poster: getRandomItem(filmPosters),
  rating: getRandomNumber(10, 100) / 10,
  releaseDate: Date.now() - getRandomNumber(Time.MONTH, 10 * Time.YEAR),
  country: getRandomItem(COUNTRIES),
  duration: getRandomNumber(10, 180),
  genres: getRandomSet(GENRES, getRandomNumber(1, 3)),
  ageLimit: getRandomItem(AGE_LIMITS),
  description: getRandomSet(sentences, getRandomNumber(1, 5)).join(` `),
  isFavorite: getRandomBool(),
  isWatched: getRandomBool(),
  inWatchlist: getRandomBool(),
  // comments: getComments(getRandomNumber(0, 5)),
  comments: getRandomUniqueArray(getRandomNumber(0, 5)),
});

const getFilms = (num = FILMS_NUM) => Array.from({length: num}, getFilm);

let films = getFilms();

const comments = films.map((film) => {
  return {
    id: film.id,
    comments: getComments(film.comments.length),
  };
});

const returnComments = (id) => {
  return comments.find((film) => film.id === id).comments;
};

const updateComments = () => {
  films.forEach((film) => {
    film.comments = returnComments(film.id).map((comment) => comment.id);
  });
};

const returnFilms = () => {
  updateComments();
  return films;
};

const deleteComment = (id) => {
  comments.forEach((film) => {
    const commentId = film.comments.findIndex((comment) => +comment.id === +id);
    if (commentId > -1) {
      film.comments.splice(commentId, 1);
    }
  });
  updateComments();
};

const postComment = (filmId, comment) => {
  comments.find((film) => +film.id === +filmId).comments.push(comment);
  updateComments();
};

const putMovie = (movie) => {
  console.log(films);
  const filmIndex = films.findIndex((film) => +film.id === +movie.id);
  console.log(movie);
  console.log(films[filmIndex]);
  Object.assign(films[filmIndex], movie);
  console.log(films);
};

export const Mock = {
  loadFilms: returnFilms,
  putMovie,
  loadComments: returnComments,
  deleteComment,
  postComment,
};
