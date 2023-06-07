import { capitalizeType, getItemFromItemsById } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { convertToBasicime } from '../utils/formatTime-Utils.js';
import { pointTypes } from '../mock/const.js';

const BLANK_TRIPPOINT = {
  basePrice: 999,
  dateFrom: '2019-07-18T20:20:13.375Z',
  dateTo: '2019-07-18T21:40:13.375Z',
  destination: {
    id: 0,
    description: 'default description',
    name: 'home',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'pic'
      },
      {
        src: 'img/photos/2.jpg',
        description: 'pic'
      },
      {
        src: 'img/photos/3.jpg',
        description: 'pic'
      },
      {
        src: 'img/photos/4.jpg',
        description: 'pic'
      }
    ]
  },
  id: 0,
  offersIDs: [2, 4],
  type: 'flight'
};


function createDestinationPicsTemplate(destination) {
  return destination.pictures.map((pic) => `
  <img class="event__photo" src="${pic.src}" alt="${pic.description}">
  `).join('');
}

function createDestinationDescriptionTemplate(destination) {
  return (destination) ? `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${createDestinationPicsTemplate(destination)}
    </div>
  </div>` : '';
}

function createOffersTemplate(currentTypeOffers, checkedOffers, id) {
  return currentTypeOffers.map((offer) => {
    const isOfferChecked = checkedOffers.includes(offer.id) ? 'checked' : '';
    return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').at(-1)}-${id}" type="checkbox" name="event-offer-${offer.title.split(' ').at(-1)}" ${isOfferChecked}>
      <label class="event__offer-label" for="event-offer-${offer.title.split(' ').at(-1)}-${id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('');
}

function createEventDetailsTemplate(tripPoint, destination, offers) {
  const currentTypeOffers = offers.find((el) => el.type === tripPoint.type).offers;
  return `
  <section class="event__section  event__section--offers ${(currentTypeOffers.length === 0) ? 'visually-hidden' : ''}" >
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createOffersTemplate(currentTypeOffers, tripPoint.offersIDs, tripPoint.id)}
    </div>
  </section>

  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    ${createDestinationDescriptionTemplate(destination)}
  </section>`;
}

function generateRollupButton(isEditForm) {
  return (!isEditForm) ? '' : `
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;
}

function createEventTypeList(currentType, currentId) {
  return pointTypes.map((type) => `
  <div class="event__type-item">
    <input id="event-type-${type}-${currentId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === currentType) ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${currentId}">${capitalizeType(type)}</label>
  </div>`
  ).join('');
}


function createDestinationList(destinations) {
  return destinations.map((destination) => `
    <option value="${destination.name}"></option>`
  ).join('');
}

function createEditFormTemplate(tripPoint, destinations, offers, isEditForm) {
  const destination = getItemFromItemsById(destinations, tripPoint.destination);
  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-${tripPoint.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${tripPoint.type}.png" alt="${tripPoint.type}">
        </label>
        <input class="event__type-toggle visually-hidden" id="event-type-toggle-${tripPoint.id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeList(tripPoint.type, tripPoint.id)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group event__field-group--destination">
        <label class="event__label event__type-output" for="event-destination-${tripPoint.id}">
        ${capitalizeType(tripPoint.type)}
        </label>
        <input class="event__input event__input--destination" id="event-destination-${tripPoint.id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${tripPoint.id}">
        <datalist id="destination-list-${tripPoint.id}">
          ${createDestinationList(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${tripPoint.id}">From</label>
        <input class="event__input event__input--time" id="event-start-time-${tripPoint.id}" type="text" name="event-start-time" value="${convertToBasicime(tripPoint.dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${tripPoint.id}">To</label>
        <input class="event__input event__input--time" id="event-end-time-${tripPoint.id}" type="text" name="event-end-time" value="${convertToBasicime(tripPoint.dateTo)}">
      </div>

      <div class="event__field-group event__field-group--price">
        <label class="event__label" for="event-price-${tripPoint.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input event__input--price" id="event-price-${tripPoint.id}" type="text" name="event-price" value="${tripPoint.basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${(isEditForm) ? 'Delete' : 'Cancel'}</button>
      ${generateRollupButton(isEditForm)}
    </header>
    <section class="event__details">
      ${createEventDetailsTemplate(tripPoint, destination, offers)}
    </section>
  </form>
  </li>`
  );
}

export default class EditFormView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #isEditForm = null;

  constructor({tripPoint = BLANK_TRIPPOINT, destinations, offers, onFormSubmit = () => (0), isEditForm = true}) {
    super();
    this._setState(EditFormView.parseTripPointToState(tripPoint));

    this.#destinations = destinations;
    this.#offers = offers;
    this.#isEditForm = isEditForm;
    this._callback.onFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }


  get template() {
    return createEditFormTemplate(this._state, this.#destinations, this.#offers, this.#isEditForm);
  }

  reset(tripPoint) {
    this.updateElement(
      EditFormView.parseTripPointToState(tripPoint),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    // this.element.querySelector('.event__available-offers')
    //   .addEventListener('change', this.#offersHandler);
    if (this.#isEditForm) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.onFormSubmit();
  };

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offersIDs: [],
    });
  };

  #destinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: this.#destinations.find((destination) => destination.name === evt.target.value).id,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };


  static parseTripPointToState(tripPoint) {
    return {...tripPoint,
    };
  }

  static parseStateToTripPoint(state) {
    const task = {...state};

    return task;
  }
}
