import {createElement} from "../util.js";

const createSiteNavigationTemplate = (filters) => {
  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filters.map(({id, title, count, isActive}) => `<a href="#${id}" class="main-navigation__item${isActive ? ` main-navigation__item--active` : ``}">${title} ${id === `all` ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`).join(`\n`)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};
export default class SiteNavigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteNavigationTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
