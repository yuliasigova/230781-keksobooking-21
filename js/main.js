"use strict";
const PINS_AMOUNT = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_TIME = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIME = [`12:00`, `13:00`, `14:00`];
/* const FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];
const PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  " http://o0.github.io/assets/images/tokyo/hotel3.jpg",
];
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;*/

const map = document.querySelector(`.map`);
const adSimilarElement = document.querySelector(`.map__pins`);
const similarElementTemplate = document
  .querySelector(`#pin`)
  .content.querySelector(`.map__pin`);

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);
const getRandomElement = (list) => list[getRandomNumber(0, list.length - 1)];

const generatePins = () => {
  const pins = [];

  for (let i = 1; i <= PINS_AMOUNT; i++) {
    pins.push({
      author: {
        avatar: `img/avatars/user0${i}.png`,
      },
      offer: {
        title: `Предложение № ${i}`,
        address: `${getRandomNumber(0, 1000)} ${getRandomNumber(0, 1000)}`,
        price: getRandomNumber(1000, 50000),
        type: getRandomElement(TYPES),
        rooms: getRandomNumber(1, 3),
        guests: getRandomNumber(1, 10),
        checkin: getRandomElement(CHECKIN_TIME),
        checkout: getRandomElement(CHECKOUT_TIME),
        // features:
        description: `Описание № ${i}`,
        // photos:
      },
      location: {
        x: getRandomNumber(0, map.clientWidth),
        y: getRandomNumber(130, 630),
      },
    });
  }
  return pins;
};

const renderPin = (pin) => {
  const pinElement = similarElementTemplate.cloneNode(true);
  pinElement.style.left = `${pin.location.x}px`;
  pinElement.style.top = `${pin.location.y}px`;
  const img = pinElement.querySelector(`img`);
  img.src = pin.author.avatar;
  img.alt = pin.offer.title;

  return pinElement;
};

const renderPins = (pins) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  adSimilarElement.appendChild(fragment);
};

const init = () => {
  const data = generatePins();
  renderPins(data);
  map.classList.remove(`map--faded`);
};

init();
