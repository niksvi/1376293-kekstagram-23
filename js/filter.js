import { renderMiniatures } from './render-miniautures.js';
import { debounce } from './utils/debounce.js';
import {dataPromise} from './main.js';

const filtersList = document.querySelector('.img-filters');
const filterButtons = filtersList.querySelectorAll('.img-filters__button');
const filterDefault = filtersList.querySelector('#filter-default');
const filterRandom = filtersList.querySelector('#filter-random');
const filterDiscussed = filtersList.querySelector('#filter-discussed');

const RERENDER_DELAY = 500;
const RANDOM_PICTURES_COUNT = 10;

const setFilterButtonsStyle = () => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((element) => element.classList.remove('img-filters__button--active'));
      button.classList.toggle('img-filters__button--active');
    });
  });
};

const getRandomPictures = (pictures) => {
  const randomPictures = pictures.map((item) => [Math.random(), item]).sort().map((element) => element[1]).slice(0, RANDOM_PICTURES_COUNT);
  renderMiniatures(randomPictures);
};

const getDiscussedPictures = (pictures) => {
  const discussedPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  renderMiniatures(discussedPictures);
};

const setFilters = (evt) => {
  const target = evt.target;
  if (target === filterDefault) {
    dataPromise.then(renderMiniatures);
  } else if (target === filterRandom) {
    dataPromise.then(getRandomPictures);
  } else if (target === filterDiscussed) {
    dataPromise.then(getDiscussedPictures);
  }
};

filtersList.addEventListener('click', debounce((evt) => setFilters(evt), RERENDER_DELAY));

setFilterButtonsStyle();
