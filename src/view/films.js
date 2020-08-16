import AbstractView from "./abstract.js";
export default class Films extends AbstractView {
  constructor(filmsLenght) {
    super();
    this._filmsLenght = filmsLenght;
  }

  getTemplate() {
    return `<section class="films">
        <section class="films-list">
          ${this._filmsLenght !== 0 ? `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
            <div class="films-list__container"></div>` : ``}
        </section>
      </section>`;
  }
}
