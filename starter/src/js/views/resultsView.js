import View from './view.js';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `Could not find recipes for your query`;
  _successMessage = '';
  _generateMarkup() {
    const markup = this._data.map(this._generateListRec).join('');
    return markup;
  }
  _generateListRec(result) {
    return `   <li class="preview">
      <a class="preview__link " href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
       
        </div>
      </a>
    </li>`;
  }
}
export default new ResultsView();
