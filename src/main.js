import HeaderProfileView from "./view/header-profile.js";
import SiteNavigationView from "./view/site-navigation.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import FilmsPresenter from "./presenter/films.js";
import {FilterID} from "./const.js";
import {render, RenderPosition} from "./utils/render.js";
import {Mock} from "./mock.js";

const films = Mock.load();

const getFilmsCount = (filterID, filmList) => {
  switch (filterID) {
    case `all`:
      return filmList.length;
    case `watchlist`:
      return filmList.filter((film) => film.inWatchlist).length;
    case `history`:
      return filmList.filter((film) => film.isWatched).length;
    case `favorites`:
      return filmList.filter((film) => film.isFavorite).length;
  }
  return 0;
};

const filters = Object.keys(FilterID).map((id) => ({
  id,
  title: FilterID[id],
  count: getFilmsCount(id, films),
  isActive: id === `all` ? true : false,
}));

const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

render(siteHeaderElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteNavigationView(filters), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(siteMainElement);

filmsPresenter.init(films);

render(siteFooterElement, new FooterStatisticsView(), RenderPosition.BEFOREEND);
