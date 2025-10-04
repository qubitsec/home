(function () {
  // --- cookie utils ---
  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([$?*|{}()[\\]\\/+^])/g,'\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function setCookie(name, value, opts) {
    var maxAge = (opts && opts.maxAge) ? opts.maxAge : 31536000; // 1y
    var parts = [
      name + '=' + encodeURIComponent(value),
      'Max-Age=' + maxAge,
      'Path=/',
      'SameSite=Lax'
    ];
    if (location.protocol === 'https:') parts.push('Secure');
    try {
      if (location.hostname.endsWith('plura.io')) parts.push('Domain=.plura.io');
    } catch (e) {}
    document.cookie = parts.join('; ');
  }
  function delCookie(name) {
    var parts = [
      name + '=',
      'Max-Age=0',
      'Path=/'
    ];
    if (location.protocol === 'https:') parts.push('Secure');
    try {
      if (location.hostname.endsWith('plura.io')) parts.push('Domain=.plura.io');
    } catch (e) {}
    document.cookie = parts.join('; ');
  }

  // --- map lang code ---
  function mapLang(lang) {
    if (!lang) return 'en';
    var l = lang.toLowerCase();
    if (l === 'ko' || l.startsWith('ko')) return 'ko';
    if (l === 'ja' || l.startsWith('ja')) return 'ja';
    return 'en';
  }

  // 공개 API: 헤더에서 onClick="jsSetCookie('ja')" 식으로 사용
  window.jsSetCookie = function (lang) {
    var target = mapLang(lang);
    // 신규 표준 쿠키(px_lang) 저장
    setCookie('px_lang', target);
    // 구 쿠키(lang) 정리(선택)
    delCookie('lang');
    // 이동: 현재 호스트 기준 언어 경로로
    location.href = '/' + target + '/';
  };

  // 페이지 진입 시 버튼 라벨 갱신 + <html lang> 정합성
  function updateLangUI() {
    // 1) px_lang 우선, 없으면 legacy lang, 없으면 documentElement lang
    var current = getCookie('px_lang') || getCookie('lang') || (document.documentElement.getAttribute('lang') || '');
    current = mapLang(current);

    // 2) 헤더 언어 버튼 라벨
    var label = (current === 'ko') ? '한국어' : (current === 'ja') ? '日本語' : 'English';
    var btn = document.querySelector('.header-right .lang > button, .header-right .lang-btn');
    if (btn) btn.textContent = label;

    // 3) <html lang> 동기화(선택)
    try { document.documentElement.setAttribute('lang', current); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', updateLangUI);
})();
