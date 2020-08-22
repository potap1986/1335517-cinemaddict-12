import FilmElementView from "../view/film-element.js";
import FilmDetailsView from "../view/film-details.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class Film {
  constructor(filmContainer, changeData) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;

    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    const siteBody = document.querySelector(`body`);
    this._siteFooterElement = siteBody.querySelector(`.footer`);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;

    this._filmComponent = new FilmElementView(film);
    this._filmPopupComponent = new FilmDetailsView(film);


    this._filmComponent.setPosterClickHandler(this._openPopup);
    this._filmComponent.setTitleClickHandler(this._openPopup);
    this._filmComponent.setCommentsClickHandler(this._openPopup);
    this._filmPopupComponent.setCloseClickHandler(this._closePopup);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this._filmContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmContainer.contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._siteFooterElement.contains(prevFilmPopupComponent.getElement())) {
      replace(this._filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  _openPopup() {
    this._siteFooterElement.appendChild(this._filmPopupComponent.getElement());


    this._filmPopupComponent.setWatchlistPopupClickHandler(this._handleWatchlistClick);
    this._filmPopupComponent.setWatchedPopupClickHandler(this._handleWatchedClick);
    this._filmPopupComponent.setFavoritePopupClickHandler(this._handleFavoriteClick);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closePopup() {
    this._siteFooterElement.removeChild(this._filmPopupComponent.getElement());
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              inWatchlist: !this._film.inWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }
}
