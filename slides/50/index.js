const show = (event) => {
  const video = event.fragment;
  if (video.play) {
    video.currentTime = 0;
    setTimeout(() => {
      video.play();
    }, 300);
  }
};

const hide = (event) => {
  const video = event.fragment;
  if (video.pause) {
    video.pause();
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
