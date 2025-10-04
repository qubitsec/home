(function () {
  // ---------- cookie utils ----------
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
    try { if (location.hostname.endsWith('plura.io')) parts.push('Domain=.plura.io'); } catch (e) {}
    document.cookie = parts.join('; ');
  }

  function mapLang(lang) {
    if (!lang) return 'en';
    var l = lang.toLowerCase();
    if (l === 'ko' || l.startsWith('ko')) return 'ko';
    if (l === 'ja' || l.startsWith('ja')) return 'ja';
    return 'en';
  }

  function goToLang(lang) {
    var origin = location.origin;
    var targets = [
      origin + '/' + lang + '/index.html',
      origin + '/' + lang + '/',
      'https://www.plura.io/' + lang + '/index.html',
      'https://www.plura.io/' + lang + '/'
    ];
    // 즉시 이동
    location.href = targets[0];
    // 1.2초 폴백
    setTimeout(function(){
      if (document.title && document.title.indexOf('Redirecting') !== -1) {
        location.href = targets[2];
      }
    }, 1200);
  }

  // 헤더에서 onClick="jsSetCookie('ja')" 식으로 호출
  window.jsSetCookie = function (lang) {
    var target = mapLang(lang);
    setCookie('px_lang', target);
    goToLang(target);
  };

  // 버튼 라벨과 <html lang> 정합성 유지(선택)
  function updateLangUI() {
    var current = mapLang(getCookie('px_lang') || (document.documentElement.getAttribute('lang') || ''));
    var label = (current === 'ko') ? '한국어' : (current === 'ja') ? '日本語' : 'English';
    var btn = document.querySelector('.header-right .lang > button, .header-right .lang-btn');
    if (btn) btn.textContent = label;
    try { document.documentElement.setAttribute('lang', current); } catch (e) {}
  }
  document.addEventListener('DOMContentLoaded', updateLangUI);
})();
