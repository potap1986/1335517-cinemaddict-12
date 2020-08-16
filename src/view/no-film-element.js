import AbstractView from "./abstract.js";

const createNoFilmElementTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoFilmElement extends AbstractView {
  getTemplate() {
    return createNoFilmElementTemplate();
  }
}
