import { isEscape } from './utils.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadFormNode = document.querySelector('.img-upload__form');
const successMessage = successTemplate.cloneNode(true);
const errorMessage = errorTemplate.cloneNode(true);

const onModalMessageHide = () => {
  successMessage.remove();
  errorMessage.remove();
  uploadFormNode.reset();
  document.removeEventListener('click', onModalMessageHide);
};

const onMessageKeydown = (evt) => {
  if(isEscape(evt)) {
    evt.preventDefault();
    onModalMessageHide();
  }
  document.removeEventListener('keydown', onMessageKeydown);
};

const onMessageAreaClick = (evt) => {
  evt.stopPropagation();
};

const showModalMessage = () => {
  document.addEventListener('click', onModalMessageHide);
  document.addEventListener('keydown', onMessageKeydown);
};

const showSuccessMessage = () => {
  const successMessageBox = successMessage.querySelector('.success__inner');
  const successButton = successMessage.querySelector('.success__button');
  showModalMessage();
  successButton.addEventListener('click', onModalMessageHide);
  successMessageBox.addEventListener('click', onMessageAreaClick);

  document.body.appendChild(successMessage);
};

const showErrorMessage = () => {
  const errorMessageBox = errorMessage.querySelector('.error__inner');
  const errorButton = errorMessage.querySelector('.error__button');
  showModalMessage();
  errorButton.addEventListener('click', onModalMessageHide);
  errorMessageBox.addEventListener('click', onMessageAreaClick);

  document.body.appendChild(errorMessage);
};

export {showErrorMessage, showSuccessMessage};

