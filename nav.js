/* nav.js — inject shared navigation */
(function () {
  const pages = [
    { label: 'Case studies',     href: 'case-studies.html' },
    { label: 'What we do',       href: 'what-we-do.html' },
    { label: 'Audience & reach', href: 'audience-reach.html' },
    { label: 'Our story',        href: 'our-story.html' },
    { label: 'Our products',     href: 'our-products.html' },
    { label: 'Team',             href: 'team.html' },
    { label: 'Get in touch',     href: 'get-in-touch.html', cta: true },
  ];

  const current = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = current === 'index.html' || current === '';

  const desktopLinks = pages.map(p => {
    const classes = [p.cta ? 'nav-cta' : '', current === p.href ? 'active' : ''].filter(Boolean).join(' ');
    return `<li><a href="${p.href}"${classes ? ` class="${classes}"` : ''}>${p.label}</a></li>`;
  }).join('');

  const mobileLinks = pages.map(p =>
    `<a href="${p.href}"${p.cta ? ' class="nav-cta"' : ''}>${p.label}</a>`
  ).join('');

  const html = `
    <nav>
      <a href="index.html" class="nav-wordmark">offfscript</a>
      <ul class="nav-links">${desktopLinks}</ul>
      <button class="hamburger" id="js-hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    ${isHome ? '<a href="https://offfscript-app.vercel.app/" target="_blank" rel="noopener" class="storydrop-tab">Go to StoryDrop ↗</a>' : ''}
    <div class="mobile-nav" id="js-mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation">
      ${mobileLinks}
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', html);

  const hamburger  = document.getElementById('js-hamburger');
  const mobileNav  = document.getElementById('js-mobile-nav');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
