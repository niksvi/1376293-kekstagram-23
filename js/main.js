import { initUploadForm } from './form.js';
import {createPhotos} from './data.js';
import {renderMiniatures} from './render-miniautures.js';

const PHOTO_AMOUNT = 25;

const photos = createPhotos(PHOTO_AMOUNT);

renderMiniatures(photos);

initUploadForm();
