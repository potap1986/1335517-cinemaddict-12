import {createElement} from "../util.js";

const createFilmsTemplate = (cinemas) => {
  return `<section class="films">
      <section class="films-list">
        ${cinemas.lenght !== 0 ? `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          <div class="films-list__container"></div>` : ``}
      </section>
    </section>`;
};
export default class Films {
  constructor(cinemas) {
    this._cinemas = cinemas;
    this._element = null;
  }

  getTemplate() {
    return createFilmsTemplate(this._cinemas);
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
