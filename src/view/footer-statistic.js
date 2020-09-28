import Abstract from "./abstract.js";

const createFooterStatisticTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

export default class FooterStatistic extends Abstract {
  getTemplate() {
    return createFooterStatisticTemplate();
  }
}
