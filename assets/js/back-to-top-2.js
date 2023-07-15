// Get button element
const btn = document.querySelector('#back-to-top-button');

// Scroll event handler
window.addEventListener('scroll', () => {

  if (window.pageYOffset > 300) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }

});

// Click handler
btn.addEventListener('click', e => {

  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

});