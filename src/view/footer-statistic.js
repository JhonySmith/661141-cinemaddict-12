import Abstract from "./abstract.js";

const createFooterStatisticTemplate = (films) => {
  return (
    `<section class="footer__statistics">
      <p>${films.length} movies inside</p>
    </section>`
  );
};

export default class FooterStatistic extends Abstract {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._films);
  }
}
