/* PLURA Website v7.1. Local UI only; no analytics, cookies, form API or form persistence. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const nav = $('#primary-nav');
  const toggle = $('#menu-toggle');
  const groups = $$('.nav-group');
  const isMobile = () => window.matchMedia('(max-width: 1023px)').matches;
  const closeGroups = (except) => groups.forEach(group => { if (group !== except) group.open = false; });
  function setMobile(open, restoreFocus = false) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '전체 메뉴 닫기' : '전체 메뉴 열기');
    document.body.classList.toggle('menu-open', open);
    ['#main', '.site-footer', '#back-top', '.noscript-note'].forEach(selector => { const el = $(selector); if (el) el.inert = open; });
    $('[data-menu-icon]', toggle)?.toggleAttribute('hidden', open);
    $('[data-close-icon]', toggle)?.toggleAttribute('hidden', !open);
    if (!open) closeGroups();
    if (restoreFocus) toggle.focus();
  }
  toggle?.addEventListener('click', () => setMobile(toggle.getAttribute('aria-expanded') !== 'true'));
  groups.forEach(group => {
    group.addEventListener('toggle', () => { if (group.open) closeGroups(group); });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) { closeGroups(); if (nav?.classList.contains('is-open')) setMobile(false); }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openGroup = groups.find(group => group.open);
    if (openGroup) { openGroup.open = false; $('summary', openGroup).focus(); }
    else if (nav?.classList.contains('is-open')) setMobile(false, true);
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a') && isMobile()) setMobile(false); });
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (!isMobile()) setMobile(false); }, 120);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !nav?.classList.contains('is-open')) return;
    const header = document.querySelector('.site-header');
    const items = Array.from(header.querySelectorAll('a[href],button,summary')).filter(el => !el.hidden && el.getClientRects().length && !el.closest('[inert]'));
    const first=items[0],last=items[items.length-1];
    if (event.shiftKey && document.activeElement===first) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement===last) {event.preventDefault();first.focus();}
  });
  groups.forEach(group => group.addEventListener('focusout', () => {
    setTimeout(() => {if (!isMobile() && !group.contains(document.activeElement)) group.open=false;},0);
  }));
  const localLinks = Array.from(document.querySelectorAll('.local-nav a[href^="#"]'));
  if (localLinks.length && 'IntersectionObserver' in window) {
    const localObserver = new IntersectionObserver(entries => {
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if (!visible) return;
      localLinks.forEach(link=>{if(link.hash==='#'+visible.target.id) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');});
    },{rootMargin:'-160px 0px -50% 0px',threshold:0});
    localLinks.forEach(link=>{const el=document.getElementById(link.hash.slice(1));if(el)localObserver.observe(el);});
  }

  // Accessible local tabs: content is already present in HTML and available without fetch.
  $$('[data-tabs]').forEach(widget => {
    const tabs = $$('[role="tab"]', widget).filter(tab => tab.closest('[data-tabs]') === widget);
    function activate(tab, moveFocus = false) {
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      if (moveFocus) tab.focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(tabs[next], true);
      });
    });
  });
  // Resource library filtering, all content remains local.
  const library = $('[data-library]');
  if (library) {
    const buttons = $$('[data-filter]', library);
    const cards = $$('[data-resource]', library);
    const search = $('[data-resource-search]', library);
    const empty = $('[data-empty]', library);
    const count = $('[data-count]', library);
    let filter = 'all';
    function updateResources() {
      const query = (search?.value || '').trim().toLocaleLowerCase('ko');
      let matches = 0;
      cards.forEach(card => {
        const categoryMatches = filter === 'all' || card.dataset.category === filter;
        const textMatches = !query || card.textContent.toLocaleLowerCase('ko').includes(query);
        card.hidden = !(categoryMatches && textMatches);
        if (!card.hidden) matches++;
      });
      if (empty) empty.hidden = matches > 0;
      if (count) count.textContent = `${matches}개 자료`;
    }
    buttons.forEach(button => button.addEventListener('click', () => {
      filter = button.dataset.filter;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      updateResources();
    }));
    search?.addEventListener('input', updateResources);
    updateResources();
  }
  // Original product screenshots only; enlarging never sends data.
  const dialog = $('#image-dialog');
  if (dialog) {
    $$('[data-zoom]').forEach(button => button.addEventListener('click', () => {
      const img = $('img', button);
      const display = $('img', dialog);
      display.src = img.src;
      display.alt = img.alt;
      $('#dialog-title').textContent = button.dataset.title || img.alt;
      dialog.showModal();
    }));
    $('.dialog-close', dialog)?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  }
  const top = $('#back-top');
  if (top) {
    const refreshTop = () => { top.hidden = window.scrollY < 600; };
    window.addEventListener('scroll', refreshTop, {passive: true});
    refreshTop();
    top.addEventListener('click', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({top: 0, behavior: reduced ? 'auto' : 'smooth'});
      $('#main')?.focus({preventScroll: true});
    });
  }
  // This is a draft composer, NOT a submission endpoint.
  const form = $('#consultation-form');
  if (form) {
    const status = $('#form-status');
    const preview = $('#form-preview');
    const params = new URLSearchParams(window.PLURA_PREVIEW_QUERY || window.location.search);
    const incomingPlan = params.get('plan');
    if (incomingPlan === 'soc' || incomingPlan === 'self') {
      const radio = $(`input[name="plan"][value="${incomingPlan}"]`, form);
      if (radio) radio.checked = true;
    }
    const value = (data, key) => String(data.get(key) || '').trim();
    ['company', 'name'].forEach(key => form.elements[key].addEventListener('input', () => form.elements[key].setCustomValidity('')));
    function buildDraft(validate = true) {
      ['company', 'name'].forEach(key => {
        const input = form.elements[key];
        input.setCustomValidity(input.value.trim() ? '' : '공백이 아닌 내용을 입력해 주세요.');
      });
      if (validate && !form.reportValidity()) return null;
      const data = new FormData(form);
      const planNames = {soc: 'PLURA-XDR + SOC', self: 'PLURA-XDR 자체 운영', discuss: '상담 후 결정'};
      const targets = data.getAll('assets').map(String).join(', ') || '상담 후 결정';
      const text = [
        'PLURA-XDR 통합 도입 상담', '',
        `회사명: ${value(data, 'company')}`, `담당자: ${value(data, 'name')}`,
        `업무 이메일: ${value(data, 'email')}`, `연락처: ${value(data, 'phone') || '미입력'}`,
        `운영 방식: ${planNames[value(data, 'plan')] || '상담 후 결정'}`,
        `보호 대상: ${targets}`, '', '문의 내용:', value(data, 'message') || '보호 환경과 운영 방식에 대해 상담을 요청합니다.',
        '', '※ 비밀번호, 인증키, 개인정보가 포함된 원본 보안 로그는 이 문의에 첨부하지 않았습니다.'
      ].join('\n');
      preview.textContent = text;
      preview.hidden = false;
      return text;
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      const text = buildDraft();
      if (!text) return;
      status.textContent = '이메일 앱에서 내용을 확인한 뒤 전송해 주세요. 아직 상담이 접수된 것은 아닙니다. 앱이 열리지 않으면 내용 복사 또는 공식 온라인 상담을 이용해 주세요.';
      const subject = `[PLURA-XDR 통합 도입 상담] ${form.elements.company.value.trim()}`;
      window.location.href = `mailto:plura@qubitsec.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    });
    $('#copy-draft')?.addEventListener('click', async () => {
      const text = buildDraft();
      if (!text) return;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(text);
        status.textContent = '상담 내용이 복사되었습니다. 메일 또는 공식 상담 양식에 붙여 넣어 주세요. 아직 상담이 접수된 것은 아닙니다.';
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(preview);
        selection.removeAllRanges(); selection.addRange(range);
        status.textContent = '아래 내용을 선택했습니다. Ctrl+C 또는 모바일의 복사 메뉴를 사용해 주세요. 이 페이지에서 서버로 전송된 내용은 없습니다.';
      }
    });
    $('#save-draft')?.addEventListener('click', () => {
      const text = buildDraft();
      if (!text) return;
      const blob = new Blob(['\uFEFF', text], {type: 'text/plain;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = 'PLURA-XDR-consultation.txt';
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      status.textContent = '상담 초안을 텍스트 파일로 저장했습니다. 서버에 접수하거나 전송하지 않았습니다.';
    });
  }
})();
