import AbstractView from "./abstract.js";

const createFilmsTemplate = (cinemas) => {
  return `<section class="films">
      <section class="films-list">
        ${cinemas.lenght !== 0 ? `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          <div class="films-list__container"></div>` : ``}
      </section>
    </section>`;
};
export default class Films extends AbstractView {
  constructor(cinemas) {
    super();
    this._cinemas = cinemas;
  }

  getTemplate() {
    return createFilmsTemplate(this._cinemas);
  }
}
