/* PLURA v7.1 shared layout, 20260922.
 * Same data-include-path convention as the supplied ko(1).zip.
 * Trusted, same-origin p_header.html / p_footer.html only; no jQuery or server-side includes.
 * Existing site.js is loaded unchanged after both fragments have settled.
 */
(function () {
  'use strict';
  var loader = document.currentScript;
  var siteSource = loader && loader.getAttribute('data-site-script');
  var page = document.body.getAttribute('data-page') || location.pathname.split('/').pop() || 'index.html';
  var slots = Array.from(document.querySelectorAll('[data-include-path]'));
  var allowed = {header: 'p_header.html', footer: 'p_footer.html'};
  var results = [];

  function showFailure(slot, error) {
    var kind = slot.getAttribute('data-include-kind');
    slot.removeAttribute('data-include-path');
    slot.setAttribute('data-include-error', kind);
    // Retain the original header height on success, but do not clip an error message on small screens.
    if (kind === 'header') slot.style.height = 'auto';
    var note = document.createElement('div');
    note.className = 'wrap noscript-note';
    note.setAttribute('role', 'status');
    var message = location.protocol === 'file:'
      ? '공통 영역을 불러오려면 HTTP/HTTPS 주소로 열어 주세요. '
      : '공통 ' + (kind === 'header' ? '메뉴' : '푸터') + '를 불러오지 못했습니다. ';
    note.appendChild(document.createTextNode(message));
    var link = document.createElement('a');
    link.href = allowed[kind];
    link.textContent = kind === 'header' ? '전체 메뉴 보기' : '하단 메뉴 보기';
    note.appendChild(link);
    var retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = '새로고침';
    retry.style.marginLeft = '12px';
    retry.addEventListener('click', function () { location.reload(); });
    note.appendChild(retry);
    slot.replaceChildren(note);
    console.warn('[PLURA shared layout] ' + kind + ': ' + error.message);
    return {kind: kind, ok: false, error: error.message};
  }

  async function loadFragment(slot) {
    var kind = slot.getAttribute('data-include-kind');
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 10000);
    try {
      if (!allowed[kind]) throw new Error('Unknown include kind');
      if (location.protocol !== 'http:' && location.protocol !== 'https:') throw new Error('HTTP/HTTPS required');
      var url = new URL(slot.getAttribute('data-include-path'), document.baseURI);
      var expected = new URL('./' + allowed[kind], document.baseURI);
      if (url.origin !== location.origin || url.pathname !== expected.pathname) throw new Error('Unexpected include URL');
      var response = await fetch(url.href, {
        credentials: 'same-origin', cache: 'no-cache', signal: controller.signal
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      var source = await response.text();
      var holder = document.createElement('template');
      holder.innerHTML = source;
      var fragment = holder.content;
      var root = fragment.querySelector(kind === 'header' ? 'header.site-header' : 'footer.site-footer');
      if (!root || fragment.querySelector('script')) throw new Error('Invalid layout fragment');
      // Only source-preservation overrides for ai.html exist in the supplied fragments.
      Array.from(fragment.querySelectorAll('template[data-include-page]')).forEach(function (variant) {
        if (variant.getAttribute('data-include-page') === page) {
          var target = root.querySelector(variant.getAttribute('data-include-replace'));
          if (!target) throw new Error('Missing layout variant target');
          target.replaceWith(variant.content.cloneNode(true));
        }
        variant.remove();
      });
      if (kind === 'header') {
        var current = slot.getAttribute('data-nav-current');
        if (current) {
          Array.from(root.querySelectorAll('.main-nav .dropdown a[href]')).forEach(function (link) {
            if (link.getAttribute('href') === current) {
              link.setAttribute('aria-current', 'page');
              var group = link.closest('.nav-group');
              if (group) group.classList.add('is-current');
            }
          });
        }
      }
      // Do not leave an extra wrapper: it would break the existing sticky header.
      slot.replaceWith(root);
      return {kind: kind, ok: true};
    } catch (error) {
      return showFailure(slot, error);
    } finally {
      clearTimeout(timeout);
    }
  }

  function loadSiteScript() {
    return new Promise(function (resolve) {
      if (!siteSource) {
        resolve({kind: 'site-script', ok: false, error: 'Missing data-site-script'});
        return;
      }
      var url = new URL(siteSource, document.baseURI);
      var expected = new URL('../res/js/site.js', document.baseURI);
      if (url.origin !== location.origin || url.pathname !== expected.pathname) {
        resolve({kind: 'site-script', ok: false, error: 'Unexpected site.js URL'});
        return;
      }
      var script = document.createElement('script');
      script.src = url.href;
      script.async = false;
      script.setAttribute('data-plura-shared-site', '');
      script.onload = function () { resolve({kind: 'site-script', ok: true}); };
      script.onerror = function () {
        console.warn('[PLURA shared layout] site.js failed to load');
        resolve({kind: 'site-script', ok: false, error: 'Script load failed'});
      };
      document.head.appendChild(script);
    });
  }

  window.PLURA_INCLUDES_READY = Promise.all(slots.map(loadFragment))
    .then(function (loaded) {
      results = loaded;
      return loadSiteScript();
    })
    .then(function (scriptResult) {
      results.push(scriptResult);
      var ready = results.every(function (item) { return item.ok; });
      document.documentElement.setAttribute('data-plura-includes-ready', ready ? 'true' : 'partial');
      document.dispatchEvent(new CustomEvent('plura:includes-ready', {detail: results}));
      return results;
    });
}());
