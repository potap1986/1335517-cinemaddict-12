
import HeaderProfileView from "./view/header-profile.js";
import SiteNavigationView from "./view/site-navigation.js";
import SortView from "./view/sort.js";
import FilmsView from "./view/films.js";
import NoFilmElementView from "./view/no-film-element.js";
import FilmElementView from "./view/film-element.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmsExtraView from "./view/films-extra.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import FilmDetailsView from "./view/film-details.js";
import {Mock} from "./mock.js";
import {FilterID} from "./const.js";
import {render, RenderPosition, remove} from "./utils/render.js";

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

const renderFilm = (container, film) => {
  const filmComponent = new FilmElementView(film);
  const filmPopupComponent = new FilmDetailsView(film);

  const addFilmPopup = () => {
    siteFooterElement.appendChild(filmPopupComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const removeFilmPopup = () => {
    siteFooterElement.removeChild(filmPopupComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removeFilmPopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.setPosterClickHandler(() => {
    addFilmPopup();
  });

  filmComponent.setTitleClickHandler(() => {
    addFilmPopup();
  });

  filmComponent.setCommentsClickHandler(() => {
    addFilmPopup();
  });

  filmPopupComponent.setCloseClickHandler(() => {
    removeFilmPopup();
  });


  render(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
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

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

render(siteHeaderElement, new HeaderProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteNavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsView(films).getElement(), RenderPosition.BEFOREEND);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsList = siteMainElement.querySelector(`.films-list`);

if (films.length === 0) {
  render(filmsList, new NoFilmElementView(films).getElement(), RenderPosition.BEFOREEND);
} else {
  const filmsListElement = filmsList.querySelector(`.films-list__container`);

  let shownFilms = films.slice(0, FILMS_COUNT);

  shownFilms.forEach((film) => renderFilm(filmsListElement, film));

  const loadMoreButtonComponent = new ShowMoreButtonView();
  render(filmsList, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.setClickHandler(() => {
    const renderingFilms = films.slice(shownFilms.length, shownFilms.length + FILMS_COUNT);
    renderingFilms.forEach((film) => {
      renderFilm(filmsListElement, film);
    });
    shownFilms = shownFilms.concat(renderingFilms);
    if (renderingFilms.length < FILMS_COUNT) {
      remove(loadMoreButtonComponent);
    }
  });

  filmsExtraLists.forEach((list) => render(filmsElement, new FilmsExtraView(list).getElement(), RenderPosition.BEFOREEND));
  const extraLists = filmsElement.querySelectorAll(`.films-list--extra`);
  extraLists.forEach((list, i) => {
    const extraFilmsContainer = list.querySelector(`.films-list__container`);
    filmsExtraLists[i].films.forEach((film) => renderFilm(extraFilmsContainer, film));
  });

}

render(siteFooterElement, new FooterStatisticsView().getElement(), RenderPosition.BEFOREEND);
