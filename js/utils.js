const ALPHANUMERIC = /^[а-яёa-z0-9]+$/;
const ALERT_SHOW_TIME = 5000;

function getRandomInt(min, max) {
  if (min >=0 && min < max){
    return Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + 1)) + Math.floor(min);
  }
  return 'Error @#$%^ !!!';
}

const checkMaxLength = (string, maxLength) => string.length <= maxLength;

const showNode = (node) => {
  node.classList.remove('hidden');
};

const hideNode = (node) => {
  node.classList.add('hidden');
};

const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const switchOnModalMode = () => document.body.classList.add('modal-open');

const switchOffModalMode = () => document.body.classList.remove('modal-open');

const isAlphaNumeric = (string) => ALPHANUMERIC.test(string.toLowerCase());

const isUnique = (array) => array.length === [...new Set(array)].length;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '30px 10px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInt, checkMaxLength, isAlphaNumeric, isUnique, isEscape, showNode, hideNode, switchOnModalMode, switchOffModalMode, showAlert};
