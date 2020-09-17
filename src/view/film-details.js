import {getDurationString, formatCommentDateString, formatDateString} from '../utils/task.js';
import AbstractView from "./abstract.js";
import he from "he";
import {generateId} from "../utils/common.js";
// import {renderTemplate, RenderPosition} from "../utils/render.js";
import {UpdateType, activeId /* , FilmsExtraTitleId*/} from "../const.js";
import {Mock} from '../mock';

const createCommentsListTemplate = (comments) => {
  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

  <ul class="film-details__comments-list">
    ${comments.map(({author, date, emotion, text, id}) =>
    `<li class="film-details__comment" data-id="${id}">
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

const createNewCommentTemplate = () => {
  return `<div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label">
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>

    </div>
  </div>`;
};

const createFilmDetailsTemplate = (film, comments) => {
  const {poster, title, ageLimit, rating, director, writers, actors, duration, releaseDate, country, genres, description, isFavorite, isWatched, inWatchlist} = film;
  const commentsList = createCommentsListTemplate(comments);
  const newComment = createNewCommentTemplate();

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
  constructor(film, commentsModel) {
    super();
    this._film = film;
    this._commentsModel = commentsModel;
    this._commentMode = null;
    this.changeComment = this.changeComment.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._emotionsHandler = this._emotionsHandler.bind(this);
    this.setCommentDeleteClickHandler = this.setCommentDeleteClickHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);
    this.init();
  }

  init() {
    this.setCommentDeleteClickHandler();
    const commentInput = this._element.querySelector(`.film-details__comment-input`);
    commentInput.addEventListener(`keydown`, this._commentSubmitHandler);
    this._element.querySelectorAll(`.film-details__emoji-item`).forEach((item) => {
      item.addEventListener(`click`, this._emotionsHandler);
    });
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._commentsModel.getComments());
  }

  _updateComments(comments) {
    const commentWrapper = document.querySelector(`.film-details__comments-wrap`);
    commentWrapper.innerHTML = `${createCommentsListTemplate(comments)} ${createNewCommentTemplate()}`;
    this.init();
  }

  setCommentDeleteClickHandler() {
    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((deleteButton) =>
        deleteButton.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const commentId = evt.target.closest(`.film-details__comment`);
          const idIndex = Number(commentId.dataset.id);
          this._commentMode = `DELETE`;
          // debugger;
          this.changeComment({id: idIndex});
          Mock.deleteComment(idIndex);
          this._updateComments(this._commentsModel._comments);
        })
      );
  }

  _emotionsHandler(evt) {
    const value = evt.target.value;
    const currentEmotion = this.getElement().querySelector(`.film-details__add-emoji-label`);
    currentEmotion.innerHTML = `<img src="images/emoji/${value}.png" width="55" height="55" alt="emoji-${value}">`;
  }

  _commentSubmit(emotion, text) {
    const NewComment = {
      id: generateId(),
      author: `MyName`,
      date: Date.now(),
      emotion: emotion.value,
      text: he.encode(text.value),
    };
    this._commentMode = `ADD`;
    this.changeComment(NewComment);
    Mock.postComment(this._film.id, NewComment);
  }

  _commentSubmitHandler(evt) {
    const isEnter = evt.key === `Enter`;
    const isControl = evt.ctrlKey;
    const isCmd = event.metaKey;
    if (isEnter && (isControl || isCmd)) {
      evt.preventDefault();
      const emotion = this._element.querySelector(`input[type="radio"]:checked`);
      const text = this._element.querySelector(`textarea`);
      if (emotion && text.value.length > 0) {
        this._commentSubmit(emotion, text);
        this._updateComments(this._commentsModel._comments);
      }
    }
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    activeId.id = 0;
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  changeComment(comment) {
    switch (this._commentMode) {
      case `DELETE`:
        this._commentsModel.delete(UpdateType.MINOR, comment);
        break;
      case `ADD`:
        this._commentsModel.add(UpdateType.MINOR, comment);
        break;
    }
  }

  setWatchlistPopupClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, callback);
  }

  setWatchedPopupClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, callback);
  }

  setFavoritePopupClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, callback);
  }
}
