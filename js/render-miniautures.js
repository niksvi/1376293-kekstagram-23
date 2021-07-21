import { showFullscreen } from './fullscreen.js';

const miniautureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');
const miniauturesList = document.querySelector('.pictures');

const renderMiniatures = (photos) =>{
  const miniauturesListFragment = document.createDocumentFragment();
  photos.forEach((photo, id) => {
    const miniautureElement = miniautureTemplate.cloneNode(true);
    miniautureElement.querySelector('.picture__img').src = photo.url;
    miniautureElement.querySelector('.picture__img').dataset.id = id;
    const miniautureInfo = miniautureElement.querySelector('.picture__info');
    miniautureInfo.querySelector('.picture__likes').textContent = photo.likes;
    miniautureInfo.querySelector('.picture__comments').textContent = photo.comments.length;
    miniauturesListFragment.appendChild(miniautureElement);
  });
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  miniauturesList.appendChild(miniauturesListFragment);
  showFullscreen(photos);
};

export {renderMiniatures};
