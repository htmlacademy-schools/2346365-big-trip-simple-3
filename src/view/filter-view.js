import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeType } from '../utils.js';


function createFilterItemTemplate(filterType) {
  return `
  <div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}">
      <label class="trip-filters__filter-label" for="filter-${filterType}">${capitalizeType(filterType)}</label>
  </div>
  `;
}
function createFilterTemplate(filters) {
  const filterItems = filters.map((filter) => createFilterItemTemplate(filter)).join('');
  return (`
    <form class="trip-filters" action="#" method="get">
      ${filterItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView{
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
