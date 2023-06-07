export default class TripPointModel {
  #tripPoints = null;
  constructor (tripPoints) {
    this.#tripPoints = tripPoints;
  }

  get TripPoints() {
    return this.#tripPoints;
  }
}
