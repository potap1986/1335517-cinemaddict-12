import AbstractView from "./abstract.js";

const createFooterStatisticsTemplate = () => {
  return `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`;
};
export default class FooterStatistics extends AbstractView {
  getTemplate() {
    return createFooterStatisticsTemplate();
  }
}
