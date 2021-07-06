const ALPHANUMERIC = /^[а-яёa-z0-9]+$/;

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

export {getRandomInt, checkMaxLength, isAlphaNumeric, isUnique, isEscape, showNode, hideNode, switchOnModalMode, switchOffModalMode};
