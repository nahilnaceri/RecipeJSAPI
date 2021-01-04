import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView';
import PaginationView from './views/paginationView.js';

import icons from 'url:../img/icons.svg';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecep = async function() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();

    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log(recipe);
    RecipeView.render(model.state.recipe);
    console.log('heeey');
  } catch (err) {
    RecipeView.renderError();
  }
};

const searchResults = async function() {
  try {
    ResultsView.renderSpinner();
    const query = SearchView.getQuery();
    if (!query) return;
    console.log(query);
    // searchView.clear();
    await model.loadSearchResults(query);

    // ResultsView.render(model.state.search.results);
    ResultsView.render(model.getSpecificPage(1));
    paginationView.render(model.state.search);
    //console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const paginationButton = function(pageTo) {
  console.log(`button clicked ${pageTo}`);
  ResultsView.render(model.getSpecificPage(pageTo));
  paginationView.render(model.state.search);
};

// ['hashchange', 'load'].forEach(el => window.addEventListener(el, showRecep));
const init = function() {
  RecipeView.addHandlerRender(showRecep);
  SearchView.handleSearch(searchResults);
  PaginationView.handleButtonClick(paginationButton);
};
init();
