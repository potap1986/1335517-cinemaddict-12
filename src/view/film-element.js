import {getDurationString} from '../util.js';

const getCommentString = (comments) => `${comments.length} comment${comments.length === 1 ? `` : `s`}`;

export const createFilmElementTemplate = (film) => {
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
