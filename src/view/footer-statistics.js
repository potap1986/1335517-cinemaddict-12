import {createElement} from "../util.js";

const createFooterStatisticsTemplate = () => {
  return `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`;
};
export default class FooterStatistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate();
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
