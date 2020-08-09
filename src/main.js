import {createHeaderProfileTemplate} from "./view/header-profile.js";
import {createSiteNavigationTemplate} from "./view/site-navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmElementTemplate} from "./view/film-element.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmsExtraTemplate} from "./view/films-extra.js";
import {createFooterStatisticsTemplate} from "./view/footer-statistics.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {Mock} from "./mock.js";
import {FilterID} from './const.js';

const FILMS_COUNT = 5;

const filmsExtraTitle = [
  `Top rated`,
  `Most commented`
];

const films = Mock.load();

const getListFilms = (filmList, title) => {
  switch (title) {
    case `Top rated`:
      return filmList.slice().sort((a, b) => b.rating - a.rating).slice(0, 2);
    case `Most commented`:
      return filmList.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
  }
  return [];
};

const filmsExtraLists = filmsExtraTitle.map((title) => ({
  title,
  films: getListFilms(films, title),
}));

const getFilmsCount = (filterID, filmList) => {
  switch (filterID) {
    case `all`:
      return filmList.length;
    case `watchlist`:
      return filmList.filter((film) => film.inWatchlist).length;
    case `history`:
      return filmList.filter((film) => film.isWatched).length;
    case `favorites`:
      return filmList.filter((film) => film.isFavorite).length;
  }
  return 0;
};

const filters = Object.keys(FilterID).map((id) => ({
  id,
  title: FilterID[id],
  count: getFilmsCount(id, films),
  isActive: id === `all` ? true : false,
}));

const siteHeaderElement = document.querySelector(`.header`);
const siteHeaderLogoElement = siteHeaderElement.querySelector(`.logo`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderLogoElement, createHeaderProfileTemplate(), `afterend`);
render(siteMainElement, createSiteNavigationTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsList = siteMainElement.querySelector(`.films-list`);
const filmsListElement = filmsList.querySelector(`.films-list__container`);

let shownFilms = films.slice(0, FILMS_COUNT);

shownFilms.forEach((film) => render(filmsListElement, createFilmElementTemplate(film), `beforeend`));

render(filmsList, createShowMoreButtonTemplate(), `beforeend`);

const onShowMoreBtnClick = () => {
  const renderingFilms = films.slice(shownFilms.length, shownFilms.length + FILMS_COUNT);
  renderingFilms.forEach((film) => {
    render(filmsListElement, createFilmElementTemplate(film), `beforeend`);
  });
  shownFilms = shownFilms.concat(renderingFilms);
  if (renderingFilms.length < FILMS_COUNT) {
    showMoreBtn.style.display = `none`;
    showMoreBtn.removeEventListener(`click`, onShowMoreBtnClick);
  }
};

const showMoreBtn = filmsList.querySelector(`.films-list__show-more`);
showMoreBtn.addEventListener(`click`, onShowMoreBtnClick);

filmsExtraLists.forEach((list) => render(filmsElement, createFilmsExtraTemplate(list), `beforeend`));

render(siteFooterElement, createFooterStatisticsTemplate(), `beforeend`);

render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);
