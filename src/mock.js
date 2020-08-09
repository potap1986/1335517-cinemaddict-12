import {Time} from './const';

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

const getRandomBool = (chance = 0.5) => Math.random() < chance;
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (min = 0, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomSorting = () => Math.random() - 0.5;

const getRandomSet = (items, num = 3) =>
  [...new Set(items.sort(getRandomSorting).slice(0, num))];

const getComment = () => ({
  emotion: getRandomItem(EMOTIONS),
  text: getRandomItem(sentences),
  author: getRandomItem(PEOPLE),
  date: Date.now() - getRandomNumber(0, Time.MONTH),
});

const getComments = (num = 5) => Array.from({length: num}, getComment);

const getFilm = () => ({
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
  comments: getComments(getRandomNumber(0, 5)),
});

const getFilms = (num = FILMS_NUM) => Array.from({length: num}, getFilm);

export const Mock = {
  load: getFilms,
};