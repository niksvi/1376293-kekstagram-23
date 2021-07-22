import { sendData } from './api.js';
import { loadPreview } from './load-preview.js';
import { showErrorMessage, showSuccessMessage } from './modal-message.js';
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
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onCancelButtonClick = () => {
  hideForm();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showForm = () => {
  showNode(overlayNode);
  switchOnModalMode();
  initTextField();
  onScaleChange();
  onEffects();

  cancelButtonNode.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const setUserFormSubmit = () => {
  uploadFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      showSuccessMessage,
      showErrorMessage,
      new FormData(evt.target),
    );
    hideForm();
  });
};

const onUploadInputChange = async ({target}) => {
  try {
    const file = target.files[0];
    await loadPreview(file);
    showForm();
  } catch (error) {
    target.value = '';
    showErrorMessage();
  }
};

const initUploadForm = () => {
  uploadInputNode.addEventListener('change', onUploadInputChange);
};

export {initUploadForm, setUserFormSubmit, hideForm};
