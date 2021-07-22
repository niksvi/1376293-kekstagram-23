import { renderMiniatures } from './render-miniautures.js';
import { debounce } from './utils/debounce.js';
import {dataPromise} from './main.js';
import { shuffle } from './utils.js';

const RERENDER_DELAY = 500;
const RANDOM_PICTURES_COUNT = 10;

const filtersList = document.querySelector('.img-filters');
const filterButtons = filtersList.querySelectorAll('.img-filters__button');
const filterDefault = filtersList.querySelector('#filter-default');
const filterRandom = filtersList.querySelector('#filter-random');
const filterDiscussed = filtersList.querySelector('#filter-discussed');

const setFilterButtonsStyle = () => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((element) => element.classList.remove('img-filters__button--active'));
      button.classList.toggle('img-filters__button--active');
    });
  });
};

const getRandomPictures = (pictures) => {
  const randomPictures = shuffle(pictures).slice(0, RANDOM_PICTURES_COUNT);
  renderMiniatures(randomPictures);
};

const getDiscussedPictures = (pictures) => {
  const discussedPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  renderMiniatures(discussedPictures);
};

const setFilters = (evt) => {
  const target = evt.target;

  switch (target) {
    case filterDefault:
      dataPromise.then(renderMiniatures);
      break;
    case filterRandom:
      dataPromise.then(getRandomPictures);
      break;
    case filterDiscussed:
      dataPromise.then(getDiscussedPictures);
      break;
    default:
      dataPromise.then(renderMiniatures);
      break;
  }
};

filtersList.addEventListener('click', debounce((evt) => setFilters(evt), RERENDER_DELAY));

setFilterButtonsStyle();
