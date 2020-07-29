"use strict";

const FILMS_COUNT = 5;
const FILMS_COUNT_EXTRA = 2;

const siteHeaderElement = document.querySelector(`.header`);
const siteHeaderLogoElement = siteHeaderElement.querySelector(`.logo`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);


const createHeaderProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const createSiteNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

const createFilmsTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};

const createFilmElementTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createFilmsExtraTemplate = (extraTitle) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title"> ${extraTitle}</h2>

      <div class="films-list__container">

      </div>
    </section>`
  );
};

const filmsExtraTitle = [
  `Top rated`,
  `Most commented`
];

const createFooterStatisticsTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

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

filmsListExtra.forEach (function (elem) {
  let filmsListExtraElement = elem.querySelector(`.films-list__container`);
  for (let i = 0; i < FILMS_COUNT_EXTRA; i++) {
    render(filmsListExtraElement, createFilmElementTemplate(), `beforeend`);
  }
});

render(siteFooterElement, createFooterStatisticsTemplate(), `beforeend`);
