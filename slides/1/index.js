const bg = document.querySelectorAll(
  '.backgrounds .slide-background .slide-background-content',
)[1];
bg.classList.add('background-transition');

const show = (event) => {
  if (event.fragment.classList.contains('background-transition')) {
    bg.style.opacity = '0.5';
  }
};

const hide = (event) => {
  if (event.fragment.classList.contains('background-transition')) {
    bg.style.opacity = '0';
  }
};

export default (enter) => {
  if (enter) {
    Reveal.addEventListener('fragmentshown', show);
    Reveal.addEventListener('fragmenthidden', hide);
  } else {
    Reveal.removeEventListener('fragmentshown', show);
    Reveal.removeEventListener('fragmenthidden', hide);
  }
};
