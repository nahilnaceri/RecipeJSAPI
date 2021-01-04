class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    return this.#parentEl.querySelector('.search__field').value;
  }
  clear() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  handleSearch(handler) {
    this.#parentEl.addEventListener('submit', function(e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
