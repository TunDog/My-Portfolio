// Sets current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Replace alert with real submission logic (e.g., fetch to API or Formspree)
function handleSubmit(e){
  e.preventDefault();
  alert('Thanks! Your message was (pretend) sent. Replace this with real form handling.');
  e.target.reset();
}

// Nav-driven Info Panel (tabs without href)
document.addEventListener('DOMContentLoaded', function(){
  const panel = document.getElementById('info-panel');
  const titleEl = document.getElementById('info-title');
  const closeBtn = document.getElementById('info-close');
  const navButtons = Array.from(document.querySelectorAll('.nav-trigger'));
  const panes = Array.from(document.querySelectorAll('.tab-pane'));
  const contactForm = document.getElementById('contact-form');
  const thumbCarousels = Array.from(document.querySelectorAll('.thumb-carousel'));

  function setActiveButton(target){
    navButtons.forEach(btn => btn.classList.toggle('is-active', btn.dataset.target === target));
  }

  function stopAllVideos(){
    const iframes = panel.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      // Reset src to stop playback
      const src = iframe.getAttribute('src');
      iframe.setAttribute('src', src);
    });
  }

  function showPanel(target){
    // Update title
    titleEl.textContent = target.charAt(0).toUpperCase() + target.slice(1);
    // Activate pane
    panes.forEach(p => {
      const isActive = p.dataset.pane === target;
      p.classList.toggle('is-active', isActive);
    });
    // Reveal panel with fade in
    panel.hidden = false;
    // Force reflow to enable transition when toggling class after hidden=false
    void panel.offsetWidth;
    panel.classList.add('is-visible');
    setActiveButton(target);
  }

  function hidePanel(){
    panel.classList.remove('is-visible');
    setActiveButton('');
    // After transition, hide and stop videos
    setTimeout(() => {
      panel.hidden = true;
      stopAllVideos();
    }, 280);
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      // If clicking same tab and panel visible, toggle close
      const isVisible = !panel.hidden && panel.classList.contains('is-visible');
      const currentActive = panes.find(p => p.classList.contains('is-active'));
      const currentKey = currentActive ? currentActive.dataset.pane : '';

      if (isVisible && currentKey === target){
        hidePanel();
      } else {
        // If switching, stop videos then show target
        stopAllVideos();
        showPanel(target);
      }
    });
  });

  if (closeBtn){
    closeBtn.addEventListener('click', hidePanel);
  }

  if (contactForm){
    contactForm.addEventListener('submit', handleSubmit);
  }

  // Coding works: rotate two-image thumbnail per card
  thumbCarousels.forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('.thumb-slide'));
    if (slides.length < 2) return;
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 3000);
  });
});

