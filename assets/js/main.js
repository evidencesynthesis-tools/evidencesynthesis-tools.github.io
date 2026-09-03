


(function () {
  'use strict';


  const ITEMS_PER_PAGE = 30;
  const SEARCH_DEBOUNCE_MS = 250;
  const YEAR_START = 2000;
  const YEAR_END = 2026;
  const VIEW_IDS = ['core', 'methodologists', 'developers'];


  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchNav = document.getElementById('searchNav');
  const matchCountEl = document.getElementById('matchCount');
  const prevBtn = document.getElementById('prevMatch');
  const nextBtn = document.getElementById('nextMatch');
  const noResultsMessage = document.getElementById('noResultsMessage');
  const toggleFiltersBtn = document.getElementById('toggleFiltersBtn');
  const filtersPanel = document.getElementById('filtersPanel');
  const yearFiltersContainer = document.getElementById('yearFilters');
  const categoryFiltersContainer = document.getElementById('categoryFilters');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const scrollContainer = document.getElementById('scroll-container');
  const scrollBtn = document.getElementById('scrollToTopBtn');
  const sectionsOverview = document.getElementById('sectionsOverview');
  const directoryBack = document.getElementById('directoryBack');

  const sections = VIEW_IDS.map(id => {
    const sectionEl = document.getElementById('section-' + id);
    const grid = sectionEl.querySelector('.tools-grid');
    const cards = Array.from(grid.querySelectorAll('.tool-card')).map(cardEl => {
      const fields = Array.from(cardEl.querySelectorAll('.card-title, .card-desc, .citation-text'))
        .map(fieldEl => ({ el: fieldEl, originalHTML: fieldEl.innerHTML }));
      return {
        el: cardEl,
        badge: ((cardEl.querySelector('.badge') || {}).textContent || '').trim(),
        text: (cardEl.textContent || '').toLowerCase(),
        fields
      };
    });
    return {
      id,
      el: sectionEl,
      grid,
      countEl: document.getElementById('sectionCount-' + id),
      paginationContainer: document.getElementById('paginationContainer-' + id),
      jumpContainer: document.getElementById('jumpToPageContainer-' + id),
      jumpInput: document.getElementById('jumpPageInput-' + id),
      jumpGoBtn: document.getElementById('jumpGoBtn-' + id),
      jumpCloseBtn: document.getElementById('jumpCloseBtn-' + id),
      cards,
      filtered: cards.slice(),
      currentPage: 1
    };
  });

  const allCards = sections.reduce((acc, s) => acc.concat(s.cards), []);


  let currentView = 'home';

  function viewFromHash() {
    const m = location.hash.match(/^#directory\/(core|methodologists|developers|all)$/);
    return m ? m[1] : 'home';
  }

  function updateHashForView(view) {
    if (view === 'home') {
      if (location.hash && location.hash !== '#') {
        history.pushState(null, '', location.pathname + location.search);
      }
      return;
    }
    const target = '#directory/' + view;
    if (location.hash !== target) {
      location.hash = target;
    }
  }

  function sectionsInView() {
    if (currentView === 'all') return sections;
    return sections.filter(s => s.id === currentView);
  }

  function setView(view, options) {
    const opts = options || {};
    const sameView = view === currentView;
    currentView = view;

    if (!sameView && (view === 'all' || VIEW_IDS.indexOf(view) !== -1)) {
      const target = sections.find(s => s.id === view);
      if (view === 'all') sections.forEach(s => { s.currentPage = 1; });
      else if (target) target.currentPage = 1;
    }

    applyViewVisibility();

    if (opts.updateHash !== false && !opts.fromHashChange) {
      updateHashForView(view);
    }

    if (opts.scroll && !sameView) {
      if (view === 'home') {
        scrollToElementTop(sectionsOverview);
      } else {
        scrollToElementTop(directoryBack);
      }
    } else if (opts.scroll && sameView) {
      const first = sectionsInView().find(s => s.filtered.length > 0);
      if (first) scrollToSection(first);
    }
  }

  function applyViewVisibility() {
    if (sectionsOverview) sectionsOverview.style.display = currentView === 'home' ? '' : 'none';
    if (directoryBack) directoryBack.style.display = currentView === 'home' ? 'none' : '';

    sections.forEach(section => {
      const inView = currentView === 'all' || currentView === section.id;
      section.el.style.display = (inView && section.filtered.length > 0) ? '' : 'none';
    });

    const totalInView = sectionsInView().reduce((acc, s) => acc + s.filtered.length, 0);
    noResultsMessage.style.display = (currentView !== 'home' && totalInView === 0) ? 'block' : 'none';
    clearFiltersBtn.style.display = (searchTerm || activeCategory) ? 'block' : 'none';
  }


  let currentScroll = 0;
  window.targetScroll = 0;
  const ease = 0.1;
  const scrollSpeed = 0.6;
  let touchStartY = 0;

  const isMobile = () => window.innerWidth <= 768;
  const maxScroll = () => Math.max(0, document.body.scrollHeight - window.innerHeight);

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
    window.targetScroll += (touchStartY - touchY) * 2;
    window.targetScroll = Math.min(Math.max(0, window.targetScroll), maxScroll());
    touchStartY = touchY;
  }, { passive: true });

  function animateScroll() {
    if (!isMobile()) {
      currentScroll += (window.targetScroll - currentScroll) * ease;
      scrollContainer.style.transform = 'translateY(' + (-currentScroll) + 'px)';
    }
    updateScrollBtnVisibility();
    requestAnimationFrame(animateScroll);
  }

  function updateScrollBtnVisibility() {
    const scrollPos = isMobile() ? window.scrollY : currentScroll;
    scrollBtn.classList.toggle('show', scrollPos > 300);
  }

  scrollBtn.addEventListener('click', () => {
    if (isMobile()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.targetScroll = 0;
    }
  });


  if (filtersPanel) {
    filtersPanel.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
    filtersPanel.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
  }

  function scrollToDocumentY(docY) {
    if (isMobile()) {
      window.scrollTo({ top: docY, behavior: 'smooth' });
      return;
    }
  
    const containerOffset = docY - currentScroll;
    window.targetScroll = Math.min(Math.max(0, containerOffset - 140), maxScroll());
  }

  function scrollToElementTop(el) {
    if (!el || el.style.display === 'none') return;
    if (isMobile()) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const rect = el.getBoundingClientRect();
    scrollToDocumentY(rect.top + currentScroll);
  }

  function scrollToSection(section) {
    scrollToElementTop(section.el);
  }


  let searchTerm = '';
  let activeCategory = null;

  function cardMatches(card) {
    if (activeCategory && card.badge.toLowerCase() !== activeCategory.toLowerCase()) return false;
    if (searchTerm && !card.text.includes(searchTerm)) return false;
    return true;
  }

  function applyFilters(options) {
    const opts = options || {};

    sections.forEach(section => {
      section.filtered = section.cards.filter(cardMatches);
      const totalPages = Math.max(1, Math.ceil(section.filtered.length / ITEMS_PER_PAGE));
      if (section.currentPage > totalPages) section.currentPage = totalPages;
      renderSection(section);
    });

    applyViewVisibility();
    refreshHighlights();

    if (opts.scroll) {
      const firstVisible = sectionsInView().find(s => s.filtered.length > 0);
      if (firstVisible) scrollToSection(firstVisible);
    }
  }

  function setSearchTerm(term, options) {
    const trimmed = (term || '').trim();
    searchTerm = trimmed.toLowerCase();


    if (searchTerm && currentView === 'home') {
      setView('all');
    }

    applyFilters(options);
    syncFilterChipStates();
  }

  function setActiveCategory(category) {
    activeCategory = category;

    if (activeCategory && currentView === 'home') {
      setView('all');
    }

    applyFilters({ scroll: !!activeCategory });
    syncFilterChipStates();
  }

  function resetFilters() {
    searchTerm = '';
    activeCategory = null;
    searchInput.value = '';
    setView('home', { scroll: true });
    applyFilters();
    syncFilterChipStates();
  }

  
  function renderSection(section) {
    const totalPages = Math.max(1, Math.ceil(section.filtered.length / ITEMS_PER_PAGE));
    const start = (section.currentPage - 1) * ITEMS_PER_PAGE;
    const visible = new Set(section.filtered.slice(start, start + ITEMS_PER_PAGE).map(card => card.el));

    section.cards.forEach(card => {
      card.el.style.display = visible.has(card.el) ? '' : 'none';
    });

    if (section.countEl) {
      section.countEl.textContent = section.filtered.length === section.cards.length
        ? section.cards.length + ' tools'
        : section.filtered.length + ' of ' + section.cards.length + ' tools';
    }

    renderSectionPagination(section, totalPages);
  }

  function renderSectionPagination(section, totalPages) {
    const container = section.paginationContainer;
    if (!container) return;
    container.innerHTML = '';

    if (totalPages <= 1) return;

    const prevBtnPag = document.createElement('button');
    prevBtnPag.className = 'pagination-btn';
    prevBtnPag.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtnPag.disabled = section.currentPage === 1;
    prevBtnPag.addEventListener('click', () => goToPage(section, section.currentPage - 1));
    container.appendChild(prevBtnPag);

    const pagesToShow = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
    } else {
      pagesToShow.push(1);
      if (section.currentPage > 3) pagesToShow.push('...');
      const start = Math.max(2, section.currentPage - 1);
      const end = Math.min(totalPages - 1, section.currentPage + 1);
      for (let i = start; i <= end; i++) pagesToShow.push(i);
      if (section.currentPage < totalPages - 2) pagesToShow.push('...');
      pagesToShow.push(totalPages);
    }

    pagesToShow.forEach(p => {
      if (p === '...') {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.innerText = '...';
        ellipsis.addEventListener('click', () => section.jumpContainer.classList.toggle('show'));
        container.appendChild(ellipsis);
      } else {
        const btn = document.createElement('button');
        btn.className = 'pagination-btn' + (p === section.currentPage ? ' active' : '');
        btn.innerText = p;
        btn.addEventListener('click', () => goToPage(section, p));
        container.appendChild(btn);
      }
    });

    const nextBtnPag = document.createElement('button');
    nextBtnPag.className = 'pagination-btn';
    nextBtnPag.innerHTML = '>';
    nextBtnPag.disabled = section.currentPage === totalPages;
    nextBtnPag.addEventListener('click', () => goToPage(section, section.currentPage + 1));
    container.appendChild(nextBtnPag);

    const lastBtnPag = document.createElement('button');
    lastBtnPag.className = 'pagination-btn';
    lastBtnPag.innerText = 'Last Page';
    lastBtnPag.disabled = section.currentPage === totalPages;
    lastBtnPag.style.marginLeft = '8px';
    lastBtnPag.addEventListener('click', () => goToPage(section, totalPages));
    container.appendChild(lastBtnPag);
  }

  function goToPage(section, page) {
    const totalPages = Math.max(1, Math.ceil(section.filtered.length / ITEMS_PER_PAGE));
    if (page < 1 || page > totalPages) return;

    section.currentPage = page;
    renderSection(section);
    refreshHighlights();
    scrollToSection(section);
  }


  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function clearHighlights() {
    allCards.forEach(card => {
      card.fields.forEach(field => {
        field.el.innerHTML = field.originalHTML;
      });
    });
  }

  function wrapMatchesInElement(rootEl, term) {
    const regex = new RegExp('(' + escapeRegExp(term) + ')', 'gi');
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(node => {
      const text = node.nodeValue;
      if (!regex.test(text)) return;
      regex.lastIndex = 0;

      const frag = document.createDocumentFragment();
      let last = 0;
      let m;
      while ((m = regex.exec(text)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const span = document.createElement('span');
        span.className = 'search-highlight';
        span.textContent = m[0];
        frag.appendChild(span);
        last = m.index + m[0].length;
        if (m[0].length === 0) regex.lastIndex++;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  function refreshHighlights() {
    clearHighlights();
    matches = [];
    currentMatchIndex = 0;

    if (!searchTerm) {
      searchNav.classList.remove('active');
      updateMatchCounter();
      return;
    }

    sectionsInView().forEach(section => {
      if (!section.filtered.length) return;
      const start = (section.currentPage - 1) * ITEMS_PER_PAGE;
      section.filtered.slice(start, start + ITEMS_PER_PAGE).forEach(card => {
        card.fields.forEach(field => {
          field.el.innerHTML = field.originalHTML;
          wrapMatchesInElement(field.el, searchTerm);
        });
      });
    });

    matches = Array.from(scrollContainer.querySelectorAll('.search-highlight'));
    if (matches.length > 0) {
      matches[0].classList.add('active');
      searchNav.classList.add('active');
    } else {
      searchNav.classList.remove('active');
    }
    updateMatchCounter();
  }


  let matches = [];
  let currentMatchIndex = 0;

  function navigateMatch(direction) {
    if (matches.length === 0) return;
    if (matches[currentMatchIndex]) matches[currentMatchIndex].classList.remove('active');
    currentMatchIndex += direction;
    if (currentMatchIndex >= matches.length) currentMatchIndex = 0;
    if (currentMatchIndex < 0) currentMatchIndex = matches.length - 1;
    matches[currentMatchIndex].classList.add('active');
    updateMatchCounter();
    scrollToMatch(currentMatchIndex);
  }

  function updateMatchCounter() {
    matchCountEl.textContent = matches.length > 0
      ? (currentMatchIndex + 1) + '/' + matches.length
      : '0/0';
  }

  function scrollToMatch(index) {
    const targetEl = matches[index];
    if (!targetEl) return;
    if (isMobile()) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const rect = targetEl.getBoundingClientRect();
    scrollToDocumentY(rect.top + currentScroll - (window.innerHeight / 2) + (targetEl.offsetHeight / 2));
  }

  nextBtn.addEventListener('click', () => navigateMatch(1));
  prevBtn.addEventListener('click', () => navigateMatch(-1));


  let searchDebounceTimer = null;

  searchInput.addEventListener('input', () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => setSearchTerm(searchInput.value), SEARCH_DEBOUNCE_MS);
  });

  searchBtn.addEventListener('click', () => setSearchTerm(searchInput.value, { scroll: true }));

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(searchDebounceTimer);
      setSearchTerm(searchInput.value, { scroll: true });
    }
  });


  toggleFiltersBtn.addEventListener('click', () => {
    filtersPanel.classList.toggle('show');
    toggleFiltersBtn.classList.toggle('active');
  });

  function createFilterButton(container, label, type, count) {
    const btn = document.createElement('button');
    btn.className = 'filter-option-btn';
    btn.dataset.filterType = type;
    btn.dataset.filterValue = label;
    btn.innerHTML = '<span>' + label + '</span> <span class="filter-count">' + count + '</span>';

    btn.addEventListener('click', () => {
      filtersPanel.classList.remove('show');
      toggleFiltersBtn.classList.remove('active');

      if (type === 'year') {
        searchInput.value = label;
        activeCategory = null;
        setSearchTerm(label, { scroll: true });
      } else {

        setActiveCategory(activeCategory === label ? null : label);
      }
    });

    container.appendChild(btn);
  }

  function initFilters() {
    for (let y = YEAR_START; y <= YEAR_END; y++) {
      const keyword = String(y).toLowerCase();
      const count = allCards.filter(card => card.text.includes(keyword)).length;
      createFilterButton(yearFiltersContainer, String(y), 'year', count);
    }

    const badgeCounts = new Map();
    allCards.forEach(card => {
      if (!card.badge) return;
      badgeCounts.set(card.badge, (badgeCounts.get(card.badge) || 0) + 1);
    });

    Array.from(badgeCounts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .forEach(([badge, count]) => {
        createFilterButton(categoryFiltersContainer, badge, 'category', count);
      });
  }

  function syncFilterChipStates() {
    document.querySelectorAll('.filter-option-btn').forEach(btn => {
      const type = btn.dataset.filterType;
      const value = btn.dataset.filterValue;
      let active = false;
      if (type === 'category') {
        active = !!activeCategory && value.toLowerCase() === activeCategory.toLowerCase();
      } else if (type === 'year') {
        active = !!searchTerm && searchTerm === value.toLowerCase();
      }
      btn.classList.toggle('active', active);
    });
  }

  clearFiltersBtn.addEventListener('click', resetFilters);


  window.copyCitation = function () {
    const citationText = document.getElementById('apaCitation').innerText;
    navigator.clipboard.writeText(citationText).then(() => {
      const btn = document.querySelector('.btn-copy');
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


  window.addEventListener('hashchange', () => {
    setView(viewFromHash(), { fromHashChange: true, scroll: true });
  });


  initFilters();
  sections.forEach(section => renderSection(section));
  setView(viewFromHash(), { updateHash: false, scroll: viewFromHash() !== 'home' });
  applyFilters();
  syncFilterChipStates();
  updateMatchCounter();
  animateScroll();
})();
