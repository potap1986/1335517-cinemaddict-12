import AbstractView from "./abstract.js";

const createSiteNavigationTemplate = (filters) => {
  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filters.map(({id, title, count, isActive}) => `<a href="#${id}" data-filter="${id}" class="main-navigation__item${isActive ? ` main-navigation__item--active` : ``}">${title} ${id === `all` ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`).join(`\n`)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};
export default class SiteNavigation extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;

    //this._currentFilter = currentFilter;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteNavigationTemplate(this._filters);
  }

  _filterChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.filterChange(evt.target.dataset.filter);
  }

  setFilterChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.getElement().addEventListener(`click`, this._filterChangeHandler);
  }
}
