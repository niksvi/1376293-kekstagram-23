import {isEscape} from './utils.js';
import {validateHashtags, validateDescription} from './validation.js';

const textFieldsetNode = document.querySelector('.text');
const hashtagsInputNode = textFieldsetNode.querySelector('.text__hashtags');
const descriptionInputNode = textFieldsetNode.querySelector('.text__description');

const textInputNodes = [hashtagsInputNode, descriptionInputNode];

const onTextInputNodeKeydown = (evt) => {
  if(isEscape(evt)){
    evt.stopPropagation();
  }
};

const validateTextInputNode = (inputNode) => {
  let validate = () => '';
  if(inputNode.matches('.text__hashtags')) {
    validate = validateHashtags;
  } else if(inputNode.matches('.text__description')) {
    validate = validateDescription;
  }

  inputNode.setCustomValidity(validate(inputNode.value));

  inputNode.reportValidity();
};

const onTextInputNodeInput = ({target}) => {
  validateTextInputNode(target);
};

const initTextField = () => {
  textInputNodes.forEach((textInputNode) => {
    textInputNode.addEventListener('input', onTextInputNodeInput);
    textInputNode.addEventListener('keydown', onTextInputNodeKeydown);
  });
};

const destroyTextField = () => {
  textInputNodes.forEach((textInputNode) => {
    textInputNode.removeEventListener('input', onTextInputNodeInput);
    textInputNode.removeEventListener('keydown', onTextInputNodeKeydown);
    textInputNode.setCustomValidity('');
  });
};

export {initTextField, destroyTextField};
