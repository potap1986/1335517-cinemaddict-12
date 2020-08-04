import {createHeaderProfileTemplate} from "./view/header-profile.js";
import {createSiteNavigationTemplate} from "./view/site-navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmElementTemplate} from "./view/film-element.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmsExtraTemplate} from "./view/films-extra.js";
import {createFooterStatisticsTemplate} from "./view/footer-statistics.js";

const FILMS_COUNT = 5;
const FILMS_COUNT_EXTRA = 2;

const filmsExtraTitle = [
  `Top rated`,
  `Most commented`
];

const siteHeaderElement = document.querySelector(`.header`);
const siteHeaderLogoElement = siteHeaderElement.querySelector(`.logo`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderLogoElement, createHeaderProfileTemplate(), `afterend`);
render(siteMainElement, createSiteNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsList = siteMainElement.querySelector(`.films-list`);
const filmsListElement = filmsList.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListElement, createFilmElementTemplate(), `beforeend`);
}

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

for (let i = 0; i < FILMS_COUNT_EXTRA; i++) {
  render(filmsElement, createFilmsExtraTemplate(filmsExtraTitle[i]), `beforeend`);
}

const filmsListExtra = siteMainElement.querySelectorAll(`.films-list--extra`);

filmsListExtra.forEach(function (elem) {
  let filmsListExtraElement = elem.querySelector(`.films-list__container`);
  for (let i = 0; i < FILMS_COUNT_EXTRA; i++) {
    render(filmsListExtraElement, createFilmElementTemplate(), `beforeend`);
  }
});

render(siteFooterElement, createFooterStatisticsTemplate(), `beforeend`);
