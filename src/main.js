import FooterStatisticsView from "./view/footer-statistics.js";
import FilmsPresenter from "./presenter/films.js";
import FilmsModel from "./model/films.js";
import {render, RenderPosition} from "./utils/render.js";
import Api from "./api.js";
import {AUTHORIZATION, END_POINT, UpdateType} from "./const.js";

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const siteBody = document.querySelector(`body`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    render(siteFooterElement, new FooterStatisticsView(filmsModel.getFilmsCount()), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, api);

filmsPresenter.init();
