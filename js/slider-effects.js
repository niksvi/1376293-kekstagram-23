import { hideNode, showNode } from './utils.js';

const sliderFormNode = document.querySelector('.effect-level');
const sliderNode = sliderFormNode.querySelector('.effect-level__slider');
const effectLevelValue= sliderFormNode.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects');

const NONE_EFFECT = 'none';
let currentEffect;
hideNode(sliderFormNode);

const effects = {
  chrome: {
    filterName: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  },
  sepia: {
    filterName: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  },
  marvin: {
    filterName: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    },
  },
  phobos: {
    filterName: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  },
  heat: {
    filterName: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  },
};

const turnEffectLevel = (effectName) => {
  const {
    filterName,
    unit,
    options,
  } = effects[effectName];

  if (sliderNode.noUiSlider) {
    sliderNode.noUiSlider.off();
    sliderNode.noUiSlider.updateOptions(options);
  } else {
    noUiSlider.create(sliderNode, {
      ...options,
      format: {
        from: (value) => parseFloat(value),
        to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      },
    });
  }

  showNode(sliderFormNode);
  sliderNode.noUiSlider.on('update', (_, handle, unencoded) => {
    const value = unencoded[handle];
    effectLevelValue.value = value;
    imgPreview.style.filter = `${filterName}(${value}${unit})`;
  });
};

const destroyEffectLevel = () => {
  if (sliderNode.noUiSlider) {
    sliderNode.noUiSlider.off();
    sliderNode.noUiSlider.destroy();
  }
  effectLevelValue.value = '';
  imgPreview.style.filter = '';
  hideNode(sliderFormNode);
};

const onFilterChange = (evt) => {
  currentEffect = evt.target.value;
  if (evt.target.matches('.effects__radio')) {
    imgPreview.className = '';
    imgPreview.classList.add(`effects__preview--${evt.target.value}`);
    if (currentEffect === NONE_EFFECT) {
      destroyEffectLevel();
    } else {
      turnEffectLevel(currentEffect);
    }
  }
};

const onEffects = () => {
  currentEffect = NONE_EFFECT;
  imgPreview.classList.add(`effects__preview--${currentEffect}`);
  effectsList.addEventListener('change', onFilterChange);
};

const offEffects = () => {
  destroyEffectLevel();
  imgPreview.classList.remove(`effects__preview--${currentEffect}`);
  effectsList.removeEventListener('change', onFilterChange);
};

export {onEffects, offEffects};
