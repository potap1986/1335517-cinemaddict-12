
import SortView from "../view/sort.js";
import FilmsView from "../view/films.js";
import NoFilmElementView from "../view/no-film-element.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import SiteNavigationView from "../view/site-navigation.js";
import StatsView from "../view/stats.js";
// import FilterModel from "../model/filter.js";
// import FilmsExtraView from "../view/films-extra.js";
import FilmPresenter from "./film.js";
import {render, RenderPosition, remove /* , getListFilms*/} from "../utils/render.js";
import {SortType, UpdateType, UserAction, FILMS_COUNT, FilterId /* , FilmsExtraTitleId*/} from "../const.js";
import LoadingView from "../view/loading.js";
// import {Mock} from "../mock.js";
export default class Films {
  constructor(filmsContainer, filmsModel, api) {
    this._filmsModel = filmsModel;
    this._filmsContainer = filmsContainer;
    this._api = api;
    this._filmPresenter = {};
    this._isLoading = true;
    this._filmExtraPresenter = {};
    this._filteredFilms = [];
    this._currentSortType = SortType.DEFAULT;
    this._currentFilter = Object.keys(FilterId)[0];
    this._filmsCount = FILMS_COUNT;
    this._sortComponent = null;
    this._showMoreButtonComponent = null;
    this._statsOpen = true;
    this._noFilmElementComponent = new NoFilmElementView();
    this._loadingComponent = new LoadingView();
    // this._filterModel = new FilterModel();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handlePopupChange = this._handlePopupChange.bind(this);
    // this._handleFilmExtraChange = this._handleFilmExtraChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleMenuChange = this._handleMenuChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilms();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return this._filteredFilms.slice().sort((a, b) => b.releaseDate - a.releaseDate);
      case SortType.BY_RATING:
        return this._filteredFilms.slice().sort((a, b) => b.rating - a.rating);
      default:
        return this._filteredFilms;
    }
  }

  _handlePopupChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.updateFilm(updateType, response);
        });
        break;
    }
  }

  _updateFilters() {
    this._filtersComponent.getElement().remove();
    this._renderFilters();
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearFilms();
        this._renderFilms();
        break;
      case UpdateType.MAJOR:
        this._clearFilms({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilms();
        break;
      case UpdateType.FILTERS:
        this._updateFilters();
        break;
      case UpdateType.INIT:
        this._isLoading = false;

        this._clearFilms();
        this._renderFilms();
        break;
    }
  }

  /* _handleFilmExtraChange(updatedFilm) {
    this._filmsArray = updateItem(this._filmsArray, updatedFilm);
    this._sourcedFilmsArray = updateItem(this._sourcedFilmsArray, updatedFilm);
    this._filmExtraPresenter[updatedFilm.id].init(updatedFilm);
  } */

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilms({resetRenderedFilmCount: true});
    this._renderFilms();
  }

  _handleFilterChange(filter) {
    if (this._currentFilter === filter && !this._statsOpen) {
      return;
    }
    this._currentFilter = filter;
    this._statsOpen = false;
    // this._filteredFilms = this._filterFilms(filter);
    this._clearFilms({resetRenderedFilmCount: true});
    this._currentSortType = SortType.DEFAULT;
    this._renderFilms();
  }

  _handleMenuChange() {
    if (this._statsOpen === true) {
      return;
    }

    this._statsOpen = true;
    // this._filteredFilms = this._filterFilms(filter);
    this._clearFilms({resetRenderedFilmCount: true});
    this._currentSortType = SortType.DEFAULT;
    this._renderFilms();
  }

  _filterFilms(filter) {
    if (filter === Object.keys(FilterId)[0]) {
      this._filteredFilms = this._filmsModel.getFilms();
    } else {
      this._filteredFilms = this._filmsModel.getFilms().filter((film) => film[filter]);
    }
  }

  _renderFilters() {
    const getFilmsCount = (filterId, filmList) => {
      switch (filterId) {
        case `all`:
          return filmList.length;
        case `inWatchlist`:
          return filmList.filter((film) => film.inWatchlist).length;
        case `isWatched`:
          return filmList.filter((film) => film.isWatched).length;
        case `isFavorite`:
          return filmList.filter((film) => film.isFavorite).length;
      }
      return 0;
    };

    const filters = Object.keys(FilterId).map((id) => ({
      id,
      title: FilterId[id],
      count: getFilmsCount(id, this._filmsModel.getFilms()),
      isActive: id === this._currentFilter ? true : false,
    }));

    this._filtersComponent = new SiteNavigationView(filters);

    this._filtersComponent.setFilterChangeHandler(this._handleFilterChange);
    this._filtersComponent.setStatsOpenHandler(this._handleMenuChange);
    render(this._siteMainElement, this._filtersComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderStats() {
    this._statsComponent = new StatsView(this._filmsModel.getFilms());
    render(this._siteMainElement, this._statsComponent, RenderPosition.BEFOREEND);
    this._statsComponent.restoreHandlers();
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handlePopupChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  /* _renderFilmExtra(container, film) {
    const filmExtraPresenter = new FilmPresenter(container, this._handleFilmExtraChange);
    filmExtraPresenter.init(film);
    this._filmExtraPresenter[film.id] = filmExtraPresenter;
  }*/

  _clearFilms({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;


    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._filtersComponent);
    remove(this._statsComponent);
    remove(this._sortComponent);
    remove(this._filmsComponent);
    remove(this._noFilmElementComponent);
    remove(this._loadingComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._filmsCount = FILMS_COUNT;
    } else {
      this._filmsCount = Math.min(filmCount, this._filmsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilms() {
    // this._filmsModel._films = Mock.loadFilms();  // Если это разблокировать, то работает обновление количества комментариев, но перестают работать переключатели
    const siteBody = document.querySelector(`body`);
    this._siteMainElement = siteBody.querySelector(`.main`);


    this._filterFilms(this._currentFilter);

    this._filmsComponent = new FilmsView(this._getFilms().length);

    this._renderFilters();
    if (this._statsOpen) {
      this._renderStats();
      return;
    }


    this._renderSort();
    render(this._filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);

    this._filmsElement = this._siteMainElement.querySelector(`.films`);
    this._filmsList = this._siteMainElement.querySelector(`.films-list`);

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getFilms().length === 0) {
      this._renderNoFilmElement();
      return;
    }

    this._renderFilmList(this._getFilms().slice(0, Math.min(this._getFilms().length, this._filmsCount)));
    this._renderShowMoreButton();
    // this._renderFilmsExtra();
  }

  _renderFilmList(films) {
    this._filmsListElement = this._filmsList.querySelector(`.films-list__container`);

    this._shownFilms = films.slice(0, this._filmsCount);

    this._shownFilms.forEach((film) => this._renderFilm(this._filmsListElement, film));
  }

  _renderLoading() {
    render(this._filmsList, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoFilmElement() {
    render(this._filmsList, this._noFilmElementComponent, RenderPosition.AFTERBEGIN);
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._showMoreButtonComponent.setClickHandler(() => {
      const renderingFilms = this._getFilms().slice(this._shownFilms.length, this._shownFilms.length + this._filmsCount);
      const filmCount = this._getFilms().length;
      const newRenderedFilmCount = Math.min(filmCount, this._filmsCount + FILMS_COUNT);
      this._filmsCount = newRenderedFilmCount;
      renderingFilms.forEach((film) => {
        this._renderFilm(this._filmsListElement, film);
      });
      this._shownFilms = this._shownFilms.concat(renderingFilms);
      if (renderingFilms.length < FILMS_COUNT) {
        remove(this._showMoreButtonComponent);
      }
    });

    render(this._filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  /* _renderFilmsExtra() {
    const filmsExtraTitle = Object.values(FilmsExtraTitleId);

    this._filmsExtraLists = filmsExtraTitle.map((title) => ({
      title,
      films: getListFilms(this._filmsArray, title),
    }));

    this._filmsExtraLists.forEach((list) => render(this._filmsComponent, new FilmsExtraView(list), RenderPosition.BEFOREEND));
    this._extraLists = this._filmsElement.querySelectorAll(`.films-list--extra`);
    this._extraLists.forEach((list, i) => {
      const extraFilmsContainer = list.querySelector(`.films-list__container`);
      this._filmsExtraLists[i].films.forEach((film) => this._renderFilmExtra(extraFilmsContainer, film));
    });
  } */
}
