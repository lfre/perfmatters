const particles = document.querySelector('.particles');

export default (enter) => {
  particles.classList.toggle('show', enter);
};
