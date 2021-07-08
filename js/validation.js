import { checkMaxLength, isUnique, isAlphaNumeric } from './utils.js';

const MAX_HASHTAG_AMOUNT = 5;
const MAX_HASHTAG_LENGTH= 20;
const MAX_DESCRIPTION_LENGTH = 140;

const validateHashtag = (string) => {
  const hash = string[0];
  if (hash !== '#'){
    return 'Хэш-тег должен начинаться с символа #';
  }

  if (string.length > MAX_HASHTAG_LENGTH) {
    return `Максимальная длина одного хэш-тега - ${MAX_HASHTAG_LENGTH} символов`;
  }

  const text = string.slice(1);
  if (!text) {
    return 'Хэш-тег не может состоять только из одной решётки';
  }

  if (!isAlphaNumeric(text)) {
    return 'В тексте хэш-тега допускаются только цифры и буквы';
  }

  return '';
};

const validateHashtags = (string) => {
  const hashtags = string.toLowerCase().split(' ').filter((tag) => tag.length > 0);

  if(hashtags.length > MAX_HASHTAG_AMOUNT) {
    return `Максимальное число хэш-тегов - ${MAX_HASHTAG_AMOUNT}`;
  }

  if (!isUnique(hashtags)) {
    return 'Хэш-тег не может быть использован более одного раза';
  }

  for(const hashtag of hashtags) {
    const validate = validateHashtag(hashtag);

    if(validate) {
      return validate;
    }
  }

  return '';
};

const validateDescription = (text) => {
  if(checkMaxLength(text, MAX_DESCRIPTION_LENGTH)) {
    return '';
  }

  return `Длина комментария не должна превышать ${MAX_DESCRIPTION_LENGTH}. Текущая длина составляет ${text.length} символов.`;
};

export {validateHashtags, validateDescription};
