import AbstractView from "./abstract.js";

const createMostCommentedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra most-commented">
      <h2 class="films-list__title">Most commented</h2>
    </section>`
  );
};

export default class MostCommentedFilms extends AbstractView {
  getTemplate() {
    return createMostCommentedFilmsTemplate();
  }
}
