
import SortView from "../view/sort.js";
import FilmsView from "../view/films.js";
import NoFilmElementView from "../view/no-film-element.js";
import FilmElementView from "../view/film-element.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsExtraView from "../view/films-extra.js";
import FilmDetailsView from "../view/film-details.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const FILMS_COUNT = 5;

export default class Films {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._sortComponent = new SortView();
    this._noFilmElementComponent = new NoFilmElementView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._filmsExtraComponent = new FilmsExtraView();

    // this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(filmsArray) {
    this._filmsArray = filmsArray.slice();
    this._filmsComponent = new FilmsView(this._filmsArray.length);
    render(this._filmsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);

    this._renderFilms();
  }

  _renderFilm(container, film) {
    const filmComponent = new FilmElementView(film);
    const filmPopupComponent = new FilmDetailsView(film);
    const siteBody = document.querySelector(`body`);
    const siteFooterElement = siteBody.querySelector(`.footer`);

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

    render(container, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms() {

    const siteBody = document.querySelector(`body`);
    const siteMainElement = siteBody.querySelector(`.main`);
    this._filmsElement = siteMainElement.querySelector(`.films`);
    this._filmsList = siteMainElement.querySelector(`.films-list`);

    if (this._filmsArray.length === 0) {
      this._renderNoFilmElement();
      return;
    }

    this._filmsListElement = this._filmsList.querySelector(`.films-list__container`);

    this._shownFilms = this._filmsArray.slice(0, FILMS_COUNT);

    this._shownFilms.forEach((film) => this._renderFilm(this._filmsListElement, film));

    this._renderShowMoreButton();
    this._renderFilmsExtra();
  }

  _renderNoFilmElement() {
    render(this._filmsComponent, this._noFilmElementComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const renderingFilms = this._filmsArray.slice(this._shownFilms.length, this._shownFilms.length + FILMS_COUNT);
      renderingFilms.forEach((film) => {
        this._renderFilm(this._filmsListElement, film);
      });
      this._shownFilms = this._shownFilms.concat(renderingFilms);
      if (renderingFilms.length < FILMS_COUNT) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderFilmsExtra() {
    const filmsExtraTitle = [
      `Top rated`,
      `Most commented`
    ];

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
      films: getListFilms(this._filmsArray, title),
    }));

    filmsExtraLists.forEach((list) => render(this._filmsComponent, new FilmsExtraView(list), RenderPosition.BEFOREEND));
    const extraLists = this._filmsElement.querySelectorAll(`.films-list--extra`);
    extraLists.forEach((list, i) => {
      const extraFilmsContainer = list.querySelector(`.films-list__container`);
      filmsExtraLists[i].films.forEach((film) => this._renderFilm(extraFilmsContainer, film));
    });
  }
}