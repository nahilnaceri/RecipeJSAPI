import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  render(data) {
    this._data = data;
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._clear();

    console.log('not rendered');
    const markup = this._generateMarkup();

    this._parentElement.insertAdjacentHTML('beforeend', markup);
    console.log('rendered');
  }
  renderSpinner() {
    const markUp = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markUp);
  }

  renderError(message = this._errorMessage) {
    this._clear();
    const markUp = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;
    this._parentElement.insertAdjacentHTML('beforeend', markUp);
  }

  renderSuccessMessage(message = this._successMessage) {
    this._clear();
    const markUp = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;
    this._parentElement.insertAdjacentHTML('beforeend', markUp);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
