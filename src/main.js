import HeaderProfileView from "./view/header-profile.js";
// import SiteNavigationView from "./view/site-navigation.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import FilmsPresenter from "./presenter/films.js";
import FilmsModel from "./model/films.js";
import {render, RenderPosition} from "./utils/render.js";
import {Mock} from "./mock.js";

const films = Mock.load();

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

render(siteHeaderElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
// render(siteMainElement, new SiteNavigationView(filters), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel);

filmsPresenter.init();

render(siteFooterElement, new FooterStatisticsView(), RenderPosition.BEFOREEND);
