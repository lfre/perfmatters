const bg = document.querySelectorAll(
  '.backgrounds .slide-background .slide-background-content',
)[1];
bg.classList.add('call-me-al');

export default () => {
  Reveal.addEventListener('fragmentshown', (event) => {
    if (event.fragment.classList.contains('call-me-al')) {
      bg.style.opacity = '0.5';
    }
  });
  Reveal.addEventListener('fragmenthidden', (event) => {
    if (event.fragment.classList.contains('call-me-al')) {
      bg.style.opacity = '0';
    }
  });
};
