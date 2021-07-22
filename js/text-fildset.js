import {isEscape} from './utils.js';
import {validateHashtags, validateDescription} from './validation.js';

const textFieldsetNode = document.querySelector('.text');
const hashtagsInputNode = textFieldsetNode.querySelector('.text__hashtags');
const descriptionInputNode = textFieldsetNode.querySelector('.text__description');

const onTextInputNodeKeydown = (evt) => {
  if(isEscape(evt)){
    evt.stopPropagation();
  }
};

const hashtagsInputNodeClick = ({target}) => {
  hashtagsInputNode.setCustomValidity(validateHashtags(target.value));
  hashtagsInputNode.reportValidity();
  hashtagsInputNode.addEventListener('keydown', onTextInputNodeKeydown);
};

const descriptionInputNodeClick = ({target}) => {
  descriptionInputNode.setCustomValidity(validateDescription(target.value));
  descriptionInputNode.reportValidity();
  descriptionInputNode.addEventListener('keydown', onTextInputNodeKeydown);
};

const initTextField = () => {
  hashtagsInputNode.addEventListener('input', hashtagsInputNodeClick);
  descriptionInputNode.addEventListener('input', descriptionInputNodeClick);
};


const destroyTextField = () => {
  hashtagsInputNode.removeEventListener('input', hashtagsInputNodeClick);
  descriptionInputNode.removeEventListener('input', descriptionInputNodeClick);
  descriptionInputNode.setCustomValidity('');
  hashtagsInputNode.setCustomValidity('');

  descriptionInputNode.removeEventListener('keydown', onTextInputNodeKeydown);
  hashtagsInputNode.removeEventListener('keydown', onTextInputNodeKeydown);
};

export {initTextField, destroyTextField};
