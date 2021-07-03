//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  if (min >=0 && min < max){
    return Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + 1)) + Math.floor(min);
  }
  return 'Error @#$%^ !!!';
}

export {getRandomInt};


const MAX_COMMENT_LENGTH = 140;

function checkCommentLength(comment, maxLength) {
  return comment.length < maxLength;
}

checkCommentLength('some twit', MAX_COMMENT_LENGTH);
