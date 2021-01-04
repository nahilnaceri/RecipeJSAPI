import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    currPage: 1
  }
};

export const loadRecipe = async function(id) {
  try {
    // const { recipe } = data.data;
    const data = await getJSON(`${API_URL}/${id}`);
    console.log(data);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
    console.log(state.recipe);
    // return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResults = async function(query) {
  try {
    state.search.query = query;
    // https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
    const data = await getJSON(`${API_URL}?search=${query}`);
    // state.search = data.data.recipe;
    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url
      };
    });
    console.log(state.search.results);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// pagination
export const getSpecificPage = function(page) {
  state.search.currPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
