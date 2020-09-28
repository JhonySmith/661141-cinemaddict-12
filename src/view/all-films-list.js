import AbstractView from "./abstract.js";

const createAllFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class AllFilmsList extends AbstractView {
  getTemplate() {
    return createAllFilmsListTemplate();
  }
}
