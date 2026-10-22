/*
 * PLURA 블로그 최신 글 2개 — 브라우저용 순수 JavaScript
 * 파일명은 요청하신 blog-lastest.js를 사용합니다.
 *
 * 공식 RSS만 읽습니다. 외부 API, 프록시, 서버 프로그램, API 키가 없습니다.
 * 중요: 홈페이지와 블로그는 다른 출처입니다. 블로그 RSS가 CORS를
 * 허용해야 합니다. 이 파일은 CORS 또는 CSP를 우회하지 않습니다.
 * 공개 RSS에 필요한 응답 헤더 예: Access-Control-Allow-Origin: *
 * 최신 글: RSS pubDate 내림차순. 같은 날짜/날짜 없음은 RSS 순서 유지.
 */
(function () {
  'use strict';

  const FEED_URL = 'https://blog.plura.io/ko/index.xml';
  const BLOG_URL = 'https://blog.plura.io/ko/';
  const LIMIT = 2;
  const TIMEOUT_MS = 12000;
  const MAX_BYTES = 10 * 1024 * 1024;
  const CACHE_KEY = 'plura.blog.direct.last-good.v1';
  const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
  const BUILD = '20261022-direct-rss-1';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function fail(code) {
    const error = new Error(code);
    error.code = code;
    return error;
  }

  function cleanTitle(value) {
    return String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ')
      .replace(/\s+/g, ' ').trim().slice(0, 1000);
  }

  // RSS 본문에서 받은 임의 주소는 사용하지 않습니다.
  function postUrl(value) {
    try {
      if (typeof value !== 'string' || !value.trim()) return '';
      const url = new URL(value.trim(), BLOG_URL);
      if (url.origin !== 'https://blog.plura.io' || url.username || url.password ||
          !/^\/ko\/[^/]+\/[^/]+/.test(url.pathname) ||
          /\/index\.(?:xml|json|html)$/.test(url.pathname) ||
          /\/page\/\d+\/?$/.test(url.pathname)) return '';
      url.hash = '';
      url.search = '';
      return url.href;
    } catch (_) { return ''; }
  }

  function childText(node, names) {
    for (const name of names) {
      const child = Array.from(node.children).find(el => el.localName === name);
      if (child && child.textContent.trim()) return child.textContent.trim();
    }
    return '';
  }

  function parseFeed(text) {
    if (!text.trim()) throw fail('EMPTY_FEED');
    // XML 외부 엔티티/DTD는 필요하지 않으므로 파싱 전에 거부합니다.
    const declarations = text.replace(/<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>/g, '');
    if (/<!DOCTYPE\b/i.test(declarations)) throw fail('DOCTYPE_NOT_ALLOWED');
    const xml = new DOMParser().parseFromString(text, 'application/xml');
    if (xml.getElementsByTagNameNS('*', 'parsererror').length) throw fail('INVALID_XML');
    const root = xml.documentElement;
    if (!root || !['rss', 'feed', 'RDF'].includes(root.localName)) throw fail('NOT_RSS');
    const isAtom = root.localName === 'feed';
    const entries = Array.from(xml.getElementsByTagNameNS('*', isAtom ? 'entry' : 'item'));
    const posts = entries.map((entry, index) => {
      let link = childText(entry, ['link']);
      if (isAtom) {
        const el = Array.from(entry.children).find(node => node.localName === 'link' &&
          (!node.getAttribute('rel') || node.getAttribute('rel') === 'alternate'));
        link = el ? el.getAttribute('href') : '';
      }
      const published = Date.parse(childText(entry, ['pubDate', 'published', 'date', 'updated']));
      return {
        title: cleanTitle(childText(entry, ['title'])),
        url: postUrl(link),
        published: Number.isFinite(published) ? published : 0,
        index: index
      };
    }).filter(post => post.title && post.url);
    posts.sort((a, b) => b.published - a.published || a.index - b.index);
    const seen = new Set();
    const latest = posts.filter(post => {
      if (seen.has(post.url)) return false;
      seen.add(post.url);
      return true;
    }).slice(0, LIMIT).map(post => ({title: post.title, url: post.url}));
    if (latest.length !== LIMIT) throw fail('TOO_FEW_POSTS');
    return latest;
  }

  async function readBody(response) {
    if (Number(response.headers.get('content-length') || 0) > MAX_BYTES) {
      throw fail('FEED_TOO_LARGE');
    }
    if (response.body && response.body.getReader && window.TextDecoder) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let bytes = 0;
      let text = '';
      try {
        while (true) {
          const chunk = await reader.read();
          if (chunk.done) break;
          bytes += chunk.value.byteLength;
          if (bytes > MAX_BYTES) {
            await reader.cancel();
            throw fail('FEED_TOO_LARGE');
          }
          text += decoder.decode(chunk.value, {stream: true});
        }
        return text + decoder.decode();
      } finally { reader.releaseLock(); }
    }
    const text = await response.text();
    if (new Blob([text]).size > MAX_BYTES) throw fail('FEED_TOO_LARGE');
    return text;
  }

  async function fetchPosts(attempt) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      // no-cors는 응답 본문을 읽을 수 없으므로 사용하지 않습니다.
      // CORS 허용 헤더는 요청이 아니라 블로그의 응답에 있어야 합니다.
      const response = await fetch(FEED_URL, {
        method: 'GET', mode: 'cors', credentials: 'omit', cache: 'no-cache',
        redirect: 'follow', referrerPolicy: 'no-referrer', signal: controller.signal
      });
      attempt.status = response.status;
      attempt.contentType = response.headers.get('content-type') || '';
      attempt.finalUrl = response.url || FEED_URL;
      if (!response.ok) throw fail('HTTP_' + response.status);
      const finalUrl = new URL(attempt.finalUrl);
      if (finalUrl.origin !== 'https://blog.plura.io' ||
          finalUrl.pathname !== '/ko/index.xml' || finalUrl.username || finalUrl.password) {
        throw fail('UNEXPECTED_RESPONSE_URL');
      }
      if (/^text\/html(?:;|$)/i.test(attempt.contentType)) throw fail('HTML_RESPONSE');
      return parseFeed(await readBody(response));
    } finally { clearTimeout(timer); }
  }

  // 페이지를 열 때마다 RSS를 조회합니다. 캐시는 연결 실패 시에만 표시합니다.
  function readLastGood() {
    try {
      const data = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (!data || data.version !== 1 || !Number.isFinite(data.checkedAt) ||
          !Array.isArray(data.posts) || data.posts.length !== LIMIT) return null;
      const age = Date.now() - data.checkedAt;
      if (age < 0 || age > CACHE_MAX_AGE_MS) return null;
      const posts = data.posts.map(post => ({
        title: cleanTitle(post && post.title), url: postUrl(post && post.url)
      }));
      if (posts.some(post => !post.title || !post.url) || posts[0].url === posts[1].url) return null;
      return posts;
    } catch (_) { return null; }
  }

  function saveLastGood(posts) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({version: 1, checkedAt: Date.now(), posts: posts}));
    } catch (_) { /* 저장소가 차단되어도 정상 조회·표시에는 영향이 없습니다. */ }
  }

  function arrow() {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'hb-arrow');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', 'M7 17 17 7M7 7h10v10');
    svg.appendChild(path);
    return svg;
  }

  function bindHover(root) {
    if (!window.PointerEvent) return;
    root.setAttribute('data-pointer-ready', '');
    const clear = () => root.querySelectorAll('.hb-pointer').forEach(link => link.classList.remove('hb-pointer'));
    root.addEventListener('pointerover', event => {
      const link = event.target.closest && event.target.closest('a');
      if (link && root.contains(link) &&
          (event.pointerType === 'mouse' || (event.pointerType === 'pen' && event.buttons === 0))) {
        link.classList.add('hb-pointer');
      }
    });
    root.addEventListener('pointerout', event => {
      const link = event.target.closest && event.target.closest('a');
      if (link && (!event.relatedTarget || !link.contains(event.relatedTarget))) link.classList.remove('hb-pointer');
    });
    root.addEventListener('pointercancel', clear);
    root.addEventListener('pointerdown', event => { if (event.pointerType === 'touch') clear(); }, {passive: true});
    window.addEventListener('blur', clear);
  }

  async function init() {
    const root = document.getElementById('home-blog-latest');
    if (!root || root.hasAttribute('data-blog-initialized')) return;
    const list = root.querySelector('[data-blog-list]');
    const heading = root.querySelector('[data-blog-heading]');
    const message = root.querySelector('[data-blog-message]');
    const status = root.querySelector('[data-blog-status]');
    if (!list || !heading || !message || !status) return;
    root.setAttribute('data-blog-initialized', '');
    bindHover(root);
    const attempt = {source: 'direct-rss', url: FEED_URL};
    const diagnostics = window.PLURA_BLOG_DIAGNOSTICS = {
      build: BUILD, provider: 'direct-rss', state: 'loading', attempts: [attempt]
    };
    function render(posts, state) {
      const fragment = document.createDocumentFragment();
      posts.forEach(post => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'hb-link';
        link.href = post.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = post.title;
        link.setAttribute('aria-label', post.title + ' (새 탭)');
        const dot = document.createElement('span');
        dot.className = 'hb-dot';
        dot.setAttribute('aria-hidden', 'true');
        const label = document.createElement('span');
        label.className = 'hb-title';
        label.textContent = post.title; // RSS 내용을 HTML/스크립트로 실행하지 않음
        link.append(dot, label, arrow());
        li.appendChild(link);
        fragment.appendChild(li);
      });
      list.replaceChildren(fragment);
      list.hidden = false;
      list.setAttribute('aria-busy', 'false');
      list.setAttribute('aria-label', state === 'stale' ? '최근 조회한 블로그 글 2개' : '최신 블로그 글 2개');
      heading.textContent = state === 'stale' ? '블로그 글 · 최근 조회' : '블로그 최신 글';
      status.textContent = state === 'stale'
        ? '최신 목록을 확인하지 못하여 최근 조회한 두 글을 표시합니다.'
        : '블로그 최신 글 두 개를 표시합니다. 제목을 선택하면 새 탭에서 열립니다.';
      message.hidden = true;
      root.dataset.blogState = state;
      diagnostics.state = state;
    }
    const onPolicyViolation = event => {
      if (event.effectiveDirective === 'connect-src' &&
          String(event.blockedURI || '').startsWith('https://blog.plura.io')) attempt.policyBlocked = true;
    };
    document.addEventListener('securitypolicyviolation', onPolicyViolation);
    const started = Date.now();
    try {
      if (!/^https?:$/.test(location.protocol)) throw fail('HTTP_REQUIRED');
      if (!window.fetch || !window.DOMParser || !window.AbortController) throw fail('UNSUPPORTED_BROWSER');
      const posts = await fetchPosts(attempt);
      attempt.result = 'OK';
      render(posts, 'live');
      root.dataset.blogSource = FEED_URL;
      saveLastGood(posts);
    } catch (error) {
      attempt.result = error && typeof error.code === 'string' ? error.code :
        (error && error.name === 'AbortError' ? 'TIMEOUT' :
          (attempt.policyBlocked ? 'CSP_BLOCKED' : 'NETWORK_OR_CORS_OR_CSP'));
      const cached = readLastGood();
      if (cached) render(cached, 'stale');
      else {
        list.replaceChildren();
        list.hidden = true;
        list.setAttribute('aria-busy', 'false');
        message.hidden = false;
        heading.textContent = 'PLURA 블로그';
        status.textContent = '새 글 목록을 불러오지 못했습니다. 블로그에서 확인해 주세요.';
        root.dataset.blogState = 'unavailable';
        diagnostics.state = 'unavailable';
      }
      console.warn('[PLURA blog]', attempt.result,
        '공식 RSS의 응답 상태·CORS 허용과 홈페이지 CSP를 확인하세요.', FEED_URL);
    } finally {
      document.removeEventListener('securitypolicyviolation', onPolicyViolation);
      attempt.elapsedMs = Date.now() - started;
    }
    if (new URLSearchParams(location.search).get('plura_blog_debug') === '1' && console.table) {
      console.table(diagnostics.attempts);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
}());
