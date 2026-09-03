

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


  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => {
    link.addEventListener('click', function () {
      tabLinks.forEach(tab => tab.classList.remove('active'));
      this.classList.add('active');
    });
  });

  animateScroll();
})();
