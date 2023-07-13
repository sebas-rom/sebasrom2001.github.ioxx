document.addEventListener('DOMContentLoaded', () => {
  for(let i = 0; i < 50; i++) {
    let bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    bubble.style.cssText = `
      --blob-size: ${2 + Math.random()*4}rem;
      --blob-distance: ${5 + Math.random()*4}rem;
      --blob-position: ${-5 + Math.random()*110}%;
      --blob-time: ${2 + Math.random()*2}s;
      --blob-delay: ${-1 * (2 + Math.random()*2)}s;
    `;
    
    document.querySelector('#bubble-container').append(bubble);
  }
});