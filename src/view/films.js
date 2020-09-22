import AbstractView from "./abstract.js";
export default class Films extends AbstractView {
  constructor(filmsLength) {
    super();
    this._filmsLength = +filmsLength;
  }

  getTemplate() {
    return `<section class="films">
        <section class="films-list">
          ${this._filmsLength !== 0 ? `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
            <div class="films-list__container"></div>` : ``}
        </section>
      </section>`;
  }
}
