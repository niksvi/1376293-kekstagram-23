import { offScaleChange, onScaleChange } from './scale-control.js';
import { offEffects, onEffects } from './slider-effects.js';
import { destroyTextField, initTextField } from './text-fildset.js';
import {isEscape, showNode, hideNode, switchOnModalMode, switchOffModalMode} from './utils.js';

const uploadFormNode = document.querySelector('.img-upload__form');
const overlayNode = uploadFormNode.querySelector('.img-upload__overlay');
const uploadInputNode = uploadFormNode.querySelector('.img-upload__input');
const cancelButtonNode = uploadFormNode.querySelector('.img-upload__cancel');

const hideForm = () => {
  hideNode(overlayNode);
  switchOffModalMode();
  uploadFormNode.reset();
  destroyTextField();
  offScaleChange();
  offEffects();
};

const onDocumentKeydown = (evt) => {
  if(isEscape(evt)) {
    evt.preventDefault();
    hideForm();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showForm = () => {
  showNode(overlayNode);
  switchOnModalMode();
  initTextField();
  onScaleChange();
  onEffects();

  cancelButtonNode.addEventListener('click', hideForm);
  document.addEventListener('keydown', onDocumentKeydown);
};

const initUploadForm = () => {
  uploadInputNode.addEventListener('change', showForm);
};

export {initUploadForm};
