import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = [];
  #tripPointApiService = null;

  constructor ({tripPointApiService}) {
    super();
    this.#tripPointApiService = tripPointApiService;
    this.init();
  }

  async init() {
    try {
      this.#destinations = await this.#tripPointApiService.destinations;
      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#destinations = [];
    }
  }


  get destinations() {
    return this.#destinations;
  }
}
