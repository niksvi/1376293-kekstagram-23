import {isEscape, hideNode, showNode, switchOnModalMode, switchOffModalMode} from './utils.js';

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

  hideNode(socialCommentCountNode);
  hideNode(commentsLoaderNode);

  cancelButtonNode.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
};


const showFullscreen = (photos) => {
  const fullscreenTemplate = (photo) => {
    imageNode.src = photo.url;
    likesCountNode.textContent = photo.likes;
    commentsCountNode.textContent = photo.comments.length;
    socialCaptionNode.textContent = photo.description;

    while(socialCommentsList.firstChild) {
      socialCommentsList.removeChild(socialCommentsList.firstChild);
    }

    for(const comment of photo.comments) {
      const commentNode = document.createElement('li');
      commentNode.classList.add('social__comment');

      const image = document.createElement('img');
      image.classList.add('social__picture');
      image.src = comment.avatar;
      image.alt = comment.name;
      image.width = 35;
      image.height = 35;
      commentNode.appendChild(image);

      const text = document.createElement('p');
      text.classList.add('social__text');
      text.textContent = comment.message;
      commentNode.appendChild(text);

      socialCommentsList.appendChild(commentNode);
    }
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
