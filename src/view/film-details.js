import {getDurationString, formatCommentDateString, formatDateString} from '../utils/task.js';
import AbstractView from "./abstract.js";
import {renderTemplate, RenderPosition} from "../utils/render.js";

const createCommentsListTemplate = (comments) => {
  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

  <ul class="film-details__comments-list">
    ${comments.map(({author, date, emotion, text}) => `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatCommentDateString(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`).join(` `)}
  </ul>`;
};

const createNewCommentTemplate = (emotion) => {
  return `<div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label">
      ${emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : ``}
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emotion === `smile` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emotion === `sleeping` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emotion === `puke` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emotion === `puke` ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>

    </div>
  </div>`;
};

const createFilmDetailsTemplate = (film, myEmotion) => {
  const {poster, title, ageLimit, rating, director, writers, actors, duration, releaseDate, country, genres, description, comments, isFavorite, isWatched, inWatchlist} = film;
  const commentsList = createCommentsListTemplate(comments);
  const newComment = createNewCommentTemplate(myEmotion);

  return `<section class="film-details"
    style="display: block">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="${title}">

            <p class="film-details__age">${ageLimit}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatDateString(releaseDate)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getDurationString(duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${inWatchlist ? ` checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${isWatched ? ` checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${isFavorite ? ` checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">

          ${commentsList}

          ${newComment}

        </section>
      </div>
    </form>
  </section>`;
};
export default class FilmDetails extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._addDeleteCommentHandlers = this._addDeleteCommentHandlers.bind(this);
    this._emotionsToggler = this._emotionsToggler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);
    this._emotionsHandler = this._emotionsHandler.bind(this);
    this._addDeleteCommentHandlers();
    this._emotionsToggler();
  }

  init() {
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  _addDeleteCommentHandlers() {
    const element = this.getElement();
    element.querySelectorAll(`.film-details__comment-delete`).forEach((item, i) => {
      const commentDeleteHandler = (evt) => {
        evt.preventDefault();
        element.querySelector(`.film-details__comments-title`).remove();
        element.querySelector(`.film-details__comments-list`).remove();
        this._film.comments.splice(i, 1);
        const commentsList = createCommentsListTemplate(this._film.comments);
        renderTemplate(element.querySelector(`.film-details__comments-wrap`), commentsList, RenderPosition.AFTERBEGIN);
        this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((it) => {
          it.addEventListener(`click`, commentDeleteHandler);
        });
      };
      item.addEventListener(`click`, commentDeleteHandler);
    });
  }

  _saveInput() {
    const input = this.getElement().querySelector(`.film-details__comment-input`);

    const data = {
      _value: ``,
      get value() {
        return this._value;
      },
      set value(newValue) {
        this._value = newValue;
        input.value = newValue;
      }
    };

    input.addEventListener(`input`, (evt) => {
      data.value = evt.target.value;
      this._textarea = data.value;
    });
  }

  _emotionsHandler(evt) {
    evt.preventDefault();
    const value = evt.target.value;
    this.getElement().querySelector(`.film-details__new-comment`).remove();
    this._myEmotion = value;
    const newComment = createNewCommentTemplate(this._myEmotion);
    renderTemplate(this.getElement().querySelector(`.film-details__comments-wrap`), newComment, RenderPosition.BEFOREEND);
    if (this._textarea) {
      this.getElement().querySelector(`.film-details__comment-input`).value = this._textarea;
    }
    this._saveInput();
    this.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((it) => {
      it.addEventListener(`click`, this._emotionsHandler);
      document.addEventListener(`keydown`, this._commentSubmitHandler);
    });
  }

  _emotionsToggler() {
    const element = this.getElement();
    this._saveInput();
    element.querySelectorAll(`.film-details__emoji-item`).forEach((item) => {
      item.addEventListener(`click`, this._emotionsHandler);
      document.addEventListener(`keydown`, this._commentSubmitHandler);
    });
  }

  _commentSubmit() {
    if (this._myEmotion && this._textarea) {
      const objectNewComment = {
        author: `MyName`,
        date: Date.now(),
        emotion: this._myEmotion,
        text: this._textarea,
      };
      this._myEmotion = ``;
      this._textarea = ``;
      this._film.comments.push(objectNewComment);
      this.getElement().querySelector(`.film-details__comments-title`).remove();
      this.getElement().querySelector(`.film-details__comments-list`).remove();
      this.getElement().querySelector(`.film-details__new-comment`).remove();
      const commentsList = createCommentsListTemplate(this._film.comments);
      renderTemplate(this.getElement().querySelector(`.film-details__comments-wrap`), commentsList, RenderPosition.AFTERBEGIN);
      const newComment = createNewCommentTemplate(this._myEmotion);
      renderTemplate(this.getElement().querySelector(`.film-details__comments-wrap`), newComment, RenderPosition.BEFOREEND);
      this._addDeleteCommentHandlers();
      this._emotionsToggler();
    }
  }

  _commentSubmitHandler(evt) {
    const isEnter = evt.key === `Enter`;
    const isControl = evt.ctrlKey;
    const isCmd = event.metaKey;
    if (isEnter && (isControl || isCmd)) {
      evt.preventDefault();
      this._commentSubmit();
      document.removeEventListener(`keydown`, this._commentSubmitHandler);
    }
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    // this._myEmotion = ``;
    // this._textarea = ``;
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setWatchlistPopupClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedPopupClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoritePopupClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
