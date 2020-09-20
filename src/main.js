import HeaderProfileView from "./view/header-profile.js";
// import SiteNavigationView from "./view/site-navigation.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import FilmsPresenter from "./presenter/films.js";
import FilmsModel from "./model/films.js";
import {render, RenderPosition} from "./utils/render.js";
// import {Mock} from "./mock.js";
import Api from "./api.js";
import {AUTHORIZATION, END_POINT, UpdateType} from "./const.js";

// const films = Mock.loadFilms();

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
// filmsModel.setFilms(films);


api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

render(siteHeaderElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
// render(siteMainElement, new SiteNavigationView(filters), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, api);

filmsPresenter.init();

render(siteFooterElement, new FooterStatisticsView(), RenderPosition.BEFOREEND);
