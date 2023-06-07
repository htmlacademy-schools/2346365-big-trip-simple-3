import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripPointModel from './model/trip-point-model.js';
import { mockInit, tripPoints } from './mock/point.js';

const main = document.querySelector('.page-body__page-main');
const pageContainer = main.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');

mockInit(5, 10);

const tripPointsModel = new TripPointModel();
const boardPresenter = new BoardPresenter({boardContainer: pageContainer, tripPointsModel});

render(new FilterView(), siteFilterElement);

boardPresenter.init();
