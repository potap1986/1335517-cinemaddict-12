import {createFilmElementTemplate} from "./film-element";

export const createFilmsExtraTemplate = (extraList) => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title"> ${extraList.title}</h2>

      <div class="films-list__container">
        ${extraList.films.map((film) => createFilmElementTemplate(film)).join(`\n`)}
      </div>
    </section>`;
};
