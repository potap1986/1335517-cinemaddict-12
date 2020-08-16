import AbstractView from "./abstract.js";
export default class FilmsExtra extends AbstractView {
  constructor(extraList) {
    super();
    this._extraList = extraList;
  }

  getTemplate() {
    return `<section class="films-list--extra">
      <h2 class="films-list__title"> ${this._extraList.title}</h2>
      <div class="films-list__container">
      </div>
    </section>`;
  }
}
