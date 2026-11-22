(() => {
  document.documentElement.classList.add('js');

  // Featured project panels are controlled by native radio inputs and CSS.
  // They remain interactive even when the preview environment blocks JavaScript.

  const navLinks = [...document.querySelectorAll('.nav-item')];
  const navTargets = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {rootMargin:'0px 0px -35px 0px', threshold:0.08});
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          navLinks.forEach(link => link.classList.toggle('is-current',link.getAttribute('href') === id));
        }
      });
    }, {rootMargin:'-25% 0px -60% 0px'});
    navTargets.forEach(el => navObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
})();
