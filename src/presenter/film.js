import FilmElementView from "../view/film-element.js";
import FilmDetailsView from "../view/film-details.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {AUTHORIZATION, END_POINT, UserAction, UpdateType, activeId} from "../const.js";
import CommentsModel from "../model/comments.js";
import Api from '../api.js';
// import {Mock} from "../mock.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  OPEN_POPUP: `OPEN_POPUP`
};
export default class Film {
  constructor(filmContainer, changeData, changePopup) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._changePopup = changePopup;

    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._mode = Mode.DEFAULT;

    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    // this._handleCommentChange = this._handleCommentChange.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    const siteBody = document.querySelector(`body`);
    this._siteFooterElement = siteBody.querySelector(`.footer`);
  }

  init(film) {
    this._film = film;
    this._filmId = film.id;
    this._commentsModel = new CommentsModel();

    this._filmComponent = new FilmElementView(film, this._changeData);
    const prevFilmComponent = this._filmComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;


    if (this._mode === Mode.DEFAULT) {
      this._filmComponent.setPosterClickHandler(this._openPopup);
      this._filmComponent.setTitleClickHandler(this._openPopup);
      this._filmComponent.setCommentsClickHandler(this._openPopup);
    }

    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (activeId.id === this._filmId) {
      this._openPopup();
    }

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
    if (this._mode !== Mode.DEFAULT) {
      remove(this._filmPopupComponent);
      activeId.id = this._filmId;
    }
  }

  _openPopup() {
    this._api = new Api(END_POINT, AUTHORIZATION);
    this._api.getComments(this._film)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._filmPopupComponent = new FilmDetailsView(this._film, this._commentsModel, this._api);
        this._siteFooterElement.appendChild(this._filmPopupComponent.getElement());
        this._filmPopupComponent.setCloseClickHandler(this._closePopup);
        this._filmPopupComponent.setWatchlistPopupClickHandler(this._handleWatchlistClick);
        this._filmPopupComponent.setWatchedPopupClickHandler(this._handleWatchedClick);
        this._filmPopupComponent.setFavoritePopupClickHandler(this._handleFavoriteClick);
      });
    // this._filmPopupComponent.changeComment(this._handleCommentChange);
    this._changePopup();
    this._mode = Mode.OPEN_POPUP;

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _closePopup() {
    const state = {
      isFavorite: this._filmPopupComponent.getElement().querySelector(`#favorite`).checked,
      isWatched: this._filmPopupComponent.getElement().querySelector(`#watched`).checked,
      inWatchlist: this._filmPopupComponent.getElement().querySelector(`#watchlist`).checked,
    };

    this._siteFooterElement.removeChild(this._filmPopupComponent.getElement());
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            state
        )
    );
    // Mock.putMovie(Object.assign({}, {id: this._film.id}, state)); ////////////////////////
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
      activeId.id = 0;
      this._closePopup();
    }
  }

  _handleWatchlistClick() {
    // this._changeData(
    //     UserAction.UPDATE_FILM,
    //     UpdateType.PATCH,
    //     Object.assign(
    //         {},
    //         this._film,
    //         {
    //           inWatchlist: !this._film.inWatchlist
    //         }
    //     )
    // );
  }

  _handleWatchedClick() {
    // this._changeData(
    //     UserAction.UPDATE_FILM,
    //     UpdateType.MINOR,
    //     Object.assign(
    //         {},
    //         this._film,
    //         {
    //           isWatched: !this._film.isWatched
    //         }
    //     )
    // );
  }

  _handleFavoriteClick() {
    // this._changeData(
    //     UserAction.UPDATE_FILM,
    //     UpdateType.MINOR,
    //     Object.assign(
    //         {},
    //         this._film,
    //         {
    //           isFavorite: !this._film.isFavorite
    //         }
    //     )
    // );
  }

  // _handleCommentChange() {
  //   this._changeData(
  //       UserAction.UPDATE_FILM,
  //       UpdateType.MINOR
  //   );
  // }
}
