const infiniteLoad = document.querySelector('.infinite-load-video');

const show = (event) => {
  const video = event.fragment;
  if (video.play) {
    video.currentTime = 0;
    setTimeout(() => {
      video.play();
    }, 300);
  } else {
    // eslint-disable-next-line
    hide({ fragment: infiniteLoad });
  }
};

const hide = (event) => {
  const video = event.fragment;
  if (video.pause) {
    video.pause();
  } else {
    show({ fragment: infiniteLoad });
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
