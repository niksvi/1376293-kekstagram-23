import '../nouislider/nouislider.js';
import { getData } from './api.js';
import './filter.js';
import { hideForm, initUploadForm, setUserFormSubmit } from './form.js';
import { renderMiniatures } from './render-miniautures.js';

export const dataPromise = getData();

dataPromise.then(renderMiniatures);

initUploadForm();

setUserFormSubmit(hideForm);
