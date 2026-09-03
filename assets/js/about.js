

(function () {
  'use strict';

  const scrollContainer = document.getElementById('scroll-container');
  const scrollBtn = document.getElementById('scrollToTopBtn');


  let currentScroll = 0;
  window.targetScroll = 0;
  const ease = 0.1;
  const scrollSpeed = 0.6;
  let touchStartY = 0;

  const isMobile = () => window.innerWidth <= 768;
  const maxScroll = () => Math.max(0, scrollContainer.scrollHeight - window.innerHeight);

  document.addEventListener('wheel', (e) => {
    if (isMobile()) return;
    window.targetScroll += e.deltaY * scrollSpeed;
    window.targetScroll = Math.min(Math.max(0, window.targetScroll), maxScroll());
  }, { passive: true });

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (isMobile()) return;
    const touchY = e.touches[0].clientY;
    window.targetScroll += (touchStartY - touchY) * 5.5;
    window.targetScroll = Math.min(Math.max(0, window.targetScroll), maxScroll());
    touchStartY = touchY;
  }, { passive: true });

  function animateScroll() {
    if (!isMobile()) {
      currentScroll += (window.targetScroll - currentScroll) * ease;
      const clamped = Math.min(Math.max(0, currentScroll), maxScroll());
      currentScroll = clamped;
      scrollContainer.style.transform = 'translateY(' + (-clamped) + 'px)';
    }
    updateScrollBtnVisibility();
    requestAnimationFrame(animateScroll);
  }

  function updateScrollBtnVisibility() {
    scrollBtn.classList.toggle('show', currentScroll > 300);
  }

  scrollBtn.addEventListener('click', () => {
    window.targetScroll = 0;
  });


  window.copyCitation = function () {
    const citationText = document.getElementById('apaCitation').innerText;
    navigator.clipboard.writeText(citationText).then(() => {
      const btn = document.querySelector('.btn-primary');
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Copied';
      btn.style.backgroundColor = '#27ae60';
      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.style.backgroundColor = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Unable to copy. Please copy manually.');
    });
  };

  window.downloadDummy = function (e, type) {
    e.preventDefault();
    let content = "";
    let mimeType = "text/plain";
    let extension = "";
    if (type === 'ris') {
      content = 'TY  - JOUR\nAU  - Sahu, V.\nPY  - 2026\nTI  - Evidence Synthesis Tools: A curated directory of strictly open-source software / tools for Evidence Synthesis.\nJO  - Zenodo\nVL  - v4.0\nDO  - 10.5281/zenodo.18681868\nER  - ';
      extension = ".ris";
    } else if (type === 'bib') {
      content = '@misc{sahu_evidencesynthesis-tools_2026,\n  title={Evidence Synthesis Tools: A curated directory of strictly open-source software / tools for Evidence Synthesis.},\n  author={Sahu, V.},\n  year={2026},\n  publisher={Zenodo},\n  version={v4.0},\n  doi={10.5281/zenodo.18681868}\n}';
      extension = ".bib";
    }
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "citation" + extension;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  // Tool counts are computed from the tool cards in index.html so that adding
  // a tool there updates every number on this page automatically.
  fetch('index.html').then(res => res.text()).then(html => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const sectionIds = ['core', 'methodologists', 'developers'];
    let total = 0;

    sectionIds.forEach(id => {
      const grid = doc.getElementById('toolsGrid-' + id);
      const count = grid ? grid.querySelectorAll('.tool-card').length : 0;
      total += count;
      document.querySelectorAll('[data-count-section="' + id + '"]').forEach(el => {
        el.textContent = count + (el.dataset.countSuffix || '');
      });
    });

    document.querySelectorAll('[data-count-total]').forEach(el => {
      el.textContent = total;
    });

    document.querySelectorAll('script[type="application/ld+json"]').forEach(scriptEl => {
      const raw = scriptEl.textContent;
      let data;
      try { data = JSON.parse(raw); } catch (e) { return; }

      let changed = false;
      (function walk(node) {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) { node.forEach(walk); return; }
        Object.keys(node).forEach(key => {
          if (key === 'description' && typeof node[key] === 'string') {
            const updated = node[key].replace(/\bover \d+\b/, 'over ' + total).replace(/\b\d+\+/, total);
            if (updated !== node[key]) { node[key] = updated; changed = true; }
          }
          walk(node[key]);
        });
      })(data);

      if (changed) scriptEl.textContent = JSON.stringify(data);
    });
  }).catch(() => { /* keep the static fallback numbers */ });


  // If firebase.js (an ES module) cannot load at all, e.g. when the site is
  // opened directly from the filesystem (file://), replace the placeholder
  // so the page never sits on "Loading..." indefinitely.
  setTimeout(() => {
    const visitsEl = document.getElementById('visits');
    if (visitsEl && visitsEl.innerText.includes('Loading')) {
      visitsEl.innerText = 'Stats unavailable (open the site online to see visit counts)';
    }
  }, 8000);


  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => {
    link.addEventListener('click', function () {
      tabLinks.forEach(tab => tab.classList.remove('active'));
      this.classList.add('active');
    });
  });

  animateScroll();
})();
