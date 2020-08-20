
import SortView from "../view/sort.js";
import FilmsView from "../view/films.js";
import NoFilmElementView from "../view/no-film-element.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsExtraView from "../view/films-extra.js";
import FilmPresenter from "./film.js";
import {updateItem} from "../utils/common.js";
import {render, RenderPosition, remove, getListFilms} from "../utils/render.js";
import {SortType, FILMS_COUNT, FilmsExtraTitleID} from "../const.js";
export default class Films {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._filmPresenter = {};
    this._filmsCount = FILMS_COUNT;

    this._sortComponent = new SortView();
    this._noFilmElementComponent = new NoFilmElementView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmsArray) {
    this._filmsArray = filmsArray.slice();
    this._sourcedFilmsArray = filmsArray.slice();
    this._filmsComponent = new FilmsView(this._filmsArray.length);
    this._renderSort();
    render(this._filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);

    this._renderFilms();
  }

  _handleFilmChange(updatedFilm) {
    this._filmsArray = updateItem(this._filmsArray, updatedFilm);
    this._sourcedFilmsArray = updateItem(this._sourcedFilmsArray, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._filmsArray.sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.BY_RATING:
        this._filmsArray.sort((a, b) => b.rating - a.rating);
        break;
      default:
        this._filmsArray = this._sourcedFilmsArray.slice();
    }

    this._currenSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }

    this._clearFilmList();
    this._sortFilms(sortType);
    this._renderFilmList();
    this._renderFilmsExtra();
  }

  _clearFilmList() {
  //  this._filmsListElement.innerHTML = ``; ?????
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._filmsCount = FILMS_COUNT;
  }

  _renderSort() {
    render(this._filmsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
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

    this._renderFilmList();
    this._renderShowMoreButton();
    this._renderFilmsExtra();
  }

  _renderFilmList() {
    this._filmsListElement = this._filmsList.querySelector(`.films-list__container`);

    this._shownFilms = this._filmsArray.slice(0, this._filmsCount);

    this._shownFilms.forEach((film) => this._renderFilm(this._filmsListElement, film));
  }

  _renderNoFilmElement() {
    render(this._filmsComponent, this._noFilmElementComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const renderingFilms = this._filmsArray.slice(this._shownFilms.length, this._shownFilms.length + this._filmsCount);
      renderingFilms.forEach((film) => {
        this._renderFilm(this._filmsListElement, film);
      });
      this._shownFilms = this._shownFilms.concat(renderingFilms);
      if (renderingFilms.length < this._filmsCount) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderFilmsExtra() {
    const filmsExtraTitle = Object.values(FilmsExtraTitleID);

    this._filmsExtraLists = filmsExtraTitle.map((title) => ({
      title,
      films: getListFilms(this._filmsArray, title),
    }));

    this._filmsExtraLists.forEach((list) => render(this._filmsComponent, new FilmsExtraView(list), RenderPosition.BEFOREEND));
    this._extraLists = this._filmsElement.querySelectorAll(`.films-list--extra`);
    this._extraLists.forEach((list, i) => {
      const extraFilmsContainer = list.querySelector(`.films-list__container`);
      this._filmsExtraLists[i].films.forEach((film) => this._renderFilm(extraFilmsContainer, film));
    });
  }
}
