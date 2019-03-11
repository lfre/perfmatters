import './index.scss';

Reveal.initialize({
  controls: false,
  history: true,
  progress: true,
});

const urlParams = new URLSearchParams(window.location.search);
const allSlides = Reveal.getTotalSlides();
const slides = {};
let currentSlide = 0;

const noop = () => ({});

const addSlide = (module, number) => {
  if (!slides[number]) {
    const show = module.default || noop;
    slides[number] = { show };
  }
  return slides[number];
};

const addHook = (slide, forward) => {
  const hide = slide.show(forward);
  slide.hide = typeof hide === 'function' ? hide : noop;
};

const loadSlide = number => new Promise((resolve, reject) => {
  if (slides[number]) return reject();
  return import(/* webpackPrefetch: true */ `./slides/${number}/`)
    .then((module) => {
      resolve({ number, slide: addSlide(module, number) });
    })
    .catch(noop);
});

const selectSlide = (number, action = 'show', forward = null) => {
  const slide = slides[number];
  if (slide) {
    if (action === 'show' && !slide.hide) {
      addHook(slide, forward);
    }
    if (slide[action]) {
      slide[action](forward);
    }
  } else {
    loadSlide(number)
      .then((response) => {
        const { number: num, slide: sl } = response;
        if (num === currentSlide && action === 'show') {
          addHook(sl, forward);
        }
      })
      .catch(noop);
  }
};

Reveal.addEventListener('ready', (event) => {
  currentSlide = event.indexh;
  // load all slides at once
  if (urlParams.has('preload')) {
    const slidesToLoad = [];
    for (let i = 0; i < allSlides; i += 1) {
      slidesToLoad.push(import(`./slides/${i}`));
    }
    Promise.all(slidesToLoad).then((loadedSlides) => {
      loadedSlides.forEach(addSlide);
      selectSlide(currentSlide);
    });
  } else {
    selectSlide(currentSlide);
  }
});

Reveal.addEventListener('slidechanged', (event) => {
  const forward = event.indexh > currentSlide;
  const range = forward ? -1 : 1;
  currentSlide = event.indexh;
  selectSlide(currentSlide, 'show', forward);
  selectSlide(currentSlide + range, 'hide', forward);
  loadSlide(currentSlide + range * 2).catch(noop);
});
