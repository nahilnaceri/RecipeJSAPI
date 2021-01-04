import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';

import icons from 'url:../img/icons.svg';
import searchView from './views/searchView.js';

const recipeContainer = document.querySelector('.recipe');

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
    const query = SearchView.getQuery();
    if (!query) return;
    console.log(query);
    searchView.clear();
    await model.loadSearchResults(query);
    //console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

// ['hashchange', 'load'].forEach(el => window.addEventListener(el, showRecep));
const init = function() {
  RecipeView.addHandlerRender(showRecep);
  SearchView.handleSearch(searchResults);
};
init();
