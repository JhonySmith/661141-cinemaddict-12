import AbstractView from "./abstract.js";

const createTopRatedFilmsTemplate = () => {
  return (
    `<section class="films-list--extra top-rated">
      <h2 class="films-list__title">Top rated</h2>
    </section>`
  );
};

export default class TopRatedFilms extends AbstractView {
  getTemplate() {
    return createTopRatedFilmsTemplate();
  }
}
