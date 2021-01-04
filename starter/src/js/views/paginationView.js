import View from './view.js';
import icons from 'url:../../img/icons.svg';

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');
  _nextButton = document.querySelector('.pagination__btn--next');
  _prevButton = document.querySelector('.pagination__btn--prev');

  handleButtonClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const pageTo = +btn.dataset.page;

      handler(pageTo);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1 and there are other pages
    if (this._data.currPage === 1 && numPages > 1) {
      return `
    <button data-page="${this._data.currPage +
      1}" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    // last page
    if (this._data.currPage === numPages && numPages > 1) {
      return `<button data-page="${this._data.currPage -
        1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.currPage - 1}</span>
    </button>
  `;
    }

    // other page
    if (this._data.currPage < numPages) {
      return `<button data-page="${this._data.currPage -
        1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.currPage - 1}</span>
    </button>
    <button data-page="${this._data.currPage +
      1}" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    return '';
  }

  nextHandler(handler) {}
}

export default new Pagination();
