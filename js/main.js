import '../nouislider/nouislider.js';
import './filter.js';
import { hideForm, initUploadForm, setUserFormSubmit } from './form.js';


initUploadForm();

setUserFormSubmit(hideForm);
