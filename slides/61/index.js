let bg = document.querySelectorAll(
  '.backgrounds .slide-background .slide-background-content',
);

bg = bg[bg.length - 2];

bg.classList.add('background-transition');

const show = (event) => {
  if (event.fragment.classList.contains('background-transition')) {
    setTimeout(() => {
      bg.style.opacity = '0.2';
    }, 500);
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
