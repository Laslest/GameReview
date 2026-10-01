document.addEventListener('DOMContentLoaded', () => {
  const searchToggle = document.querySelector('[data-search-toggle]');
  const searchPanel = document.querySelector('[data-search-panel]');
  const searchInput = document.querySelector('[data-search-input]');

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', () => {
      const open = searchPanel.classList.toggle('open');
      searchToggle.setAttribute('aria-expanded', String(open));
      if (open && searchInput) searchInput.focus();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      const term = event.target.value.toLowerCase().trim();
      document.querySelectorAll('[data-searchable]').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = !term || text.includes(term) ? '' : 'none';
      });
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const reviewItems = document.querySelectorAll('[data-platform]');
  const emptyState = document.querySelector('[data-empty-state]');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      let visible = 0;

      reviewItems.forEach(item => {
        const platforms = item.dataset.platform.split(' ');
        const show = filter === 'todos' || platforms.includes(filter);
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      if (emptyState) emptyState.style.display = visible ? 'none' : 'block';
    });
  });

  document.querySelectorAll('[data-newsletter]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const feedback = form.closest('.newsletter')?.querySelector('[data-form-feedback]');
      const valid = input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

      if (feedback) {
        feedback.textContent = valid
          ? 'Cadastro simulado com sucesso. Obrigado por acompanhar o SavePoint!'
          : 'Digite um e-mail válido para continuar.';
      }
      if (valid) form.reset();
    });
  });

  const loadMoreButton = document.querySelector('[data-load-more]');
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', () => {
      document.querySelectorAll('[data-extra-news]').forEach(item => item.classList.remove('d-none'));
      loadMoreButton.remove();
    });
  }

  document.querySelectorAll('[data-current-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const breakingTrack = document.querySelector('[data-breaking-track]');
  if (breakingTrack && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let offset = 0;
    setInterval(() => {
      const max = Math.max(0, breakingTrack.scrollWidth - breakingTrack.parentElement.clientWidth);
      offset = offset >= max ? 0 : Math.min(max, offset + 220);
      breakingTrack.style.transform = `translateX(-${offset}px)`;
    }, 3800);
  }
});
