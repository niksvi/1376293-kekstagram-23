import {isEscape, hideNode, showNode, switchOnModalMode, switchOffModalMode} from './utils.js';

const COMMENTS_STEP = 5;

const miniauturesList = document.querySelector('.pictures');
const bigPictureNode = document.querySelector('.big-picture');
const imageNode = bigPictureNode.querySelector('.big-picture__img img');
const cancelButtonNode = bigPictureNode.querySelector('.big-picture__cancel');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const socialCaptionNode = bigPictureNode.querySelector('.social__caption');
const socialCommentsList = bigPictureNode.querySelector('.social__comments');
const socialCommentCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsCountNode = bigPictureNode.querySelector('.comments-count');
const commentsLoaderNode = bigPictureNode.querySelector('.comments-loader');

let currentComments = [];

const showComment = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentPicture = document.createElement('img');
  commentPicture.classList.add('social__picture');
  commentPicture.src = avatar;
  commentPicture.alt = name;
  commentPicture.width = 35;
  commentPicture.height = 35;
  commentElement.appendChild(commentPicture);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;
  commentElement.appendChild(commentText);

  socialCommentsList.appendChild(commentElement);
};

const showComments = (comments) => comments.forEach(showComment);

const showMoreComments = () => {
  const displayedCommentsCount = socialCommentsList.querySelectorAll('.social__comment').length;
  showComments(currentComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_STEP));
  const numberComments = socialCommentsList.querySelectorAll('.social__comment').length;
  if (numberComments === currentComments.length) {
    hideNode(commentsLoaderNode);
  } else {
    showNode(commentsLoaderNode);
  }
  socialCommentCountNode.textContent = `${numberComments} из ${currentComments.length} комментариев`;
};


const closeModal = () => {
  hideNode(bigPictureNode);
  switchOffModalMode();
};

const onDocumentKeydown = (evt) => {
  if(isEscape(evt)) {
    evt.preventDefault();
    closeModal();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  showNode(bigPictureNode);
  switchOnModalMode();

  cancelButtonNode.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderNode.addEventListener('click', showMoreComments);
};


const showFullscreen = (photos) => {
  const fullscreenTemplate = (photo) => {
    imageNode.src = photo.url;
    likesCountNode.textContent = photo.likes;
    commentsCountNode.textContent = photo.comments.length;
    socialCaptionNode.textContent = photo.description;
    socialCommentsList.innerHTML = '';
    currentComments = photo.comments;
    showMoreComments(photo.comments);
  };

  const onPictureNodeClick = (evt) => {
    if (evt.target.closest('.picture')) {
      const dataClickImage = evt.target.getAttribute('data-id');

      openModal();

      const photo = photos[dataClickImage];
      fullscreenTemplate(photo);
    }
  };

  miniauturesList.addEventListener('click', onPictureNodeClick);
};

export {showFullscreen};
