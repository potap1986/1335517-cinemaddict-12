import {getDurationString, getCommentString} from '../utils/task.js';
import AbstractView from "./abstract.js";

const createFilmElementTemplate = (film) => {
  const {poster, title, rating, duration, releaseDate, genres, description, comments, isFavorite, isWatched, inWatchlist} = film;
  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${new Date(releaseDate).getFullYear()}</span>
        <span class="film-card__duration">${getDurationString(duration)}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="${title} poster" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${getCommentString(comments)}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item${inWatchlist ? ` film-card__controls-item--active` : ``} button film-card__controls-item--add-to-watchlist ">Add to watchlist</button>
        <button class="film-card__controls-item${isWatched ? ` film-card__controls-item--active` : ``} button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item${isFavorite ? ` film-card__controls-item--active` : ``} button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`;
};
export default class FilmElement extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmElementTemplate(this._film);
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._posterClickHandler);
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._titleClickHandler);
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.wacthListClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favotriteClick();
  }

  setCommentsClickHandler(callback) {
    this._callback.commentsClick = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._commentsClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
