import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import RecipeView from './views/recipeView.js';

import icons from 'url:../img/icons.svg';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const renderSpinner = function(parentEl) {
  const markUp = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markUp);
};

const showRecep = async function() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    renderSpinner(recipeContainer);

    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log(recipe);
    RecipeView.render(model.state.recipe);
    console.log('heeey');
  } catch (err) {
    const html = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>No recipes found for your query. Please try again!</p>
  </div> `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('beforeend', html);
  }
};
['hashchange', 'load'].forEach(el => window.addEventListener(el, showRecep));
