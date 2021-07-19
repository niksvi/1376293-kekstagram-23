import './api.js';
import '../nouislider/nouislider.js';
import { hideForm, initUploadForm, setUserFormSubmit } from './form.js';
import {renderMiniatures} from './render-miniautures.js';
import { showFullscreen } from './fullscreen.js';
import { getData } from './api.js';

const dataPromise = getData(() => {});

dataPromise.then(renderMiniatures);

dataPromise.then(showFullscreen);

initUploadForm();

setUserFormSubmit(hideForm);
