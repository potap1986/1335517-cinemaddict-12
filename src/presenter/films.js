
import SortView from "./view/sort.js";
import FilmsView from "./view/films.js";
import NoFilmElementView from "./view/no-film-element.js";
import FilmElementView from "./view/film-element.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmsExtraView from "./view/films-extra.js";
import FilmDetailsView from "./view/film-details.js";
import {render, RenderPosition} from "./utils/render.js";

const FILMS_NUM = 20;
const FILMS_COUNT = 5;

export default class Films {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._filmsComponent = new FilmsView();
    this._sortComponent = new SortView();
    this._filmElementComponent = new FilmElementView();
    this._noFilmElementComponent = new NoFilmElementView();
  }

  init(filmsList) {
    this._filmsList = filmsList.slice();

    render(this._filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmElementComponent, RenderPosition.BEFOREEND);

    this._renderFilmsList();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderFilmElement() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderFilms() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoFilmElement() {
    // Метод для рендеринга заглушки
  }

  _renderShowMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderFilmDetails() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
