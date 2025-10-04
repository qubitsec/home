(function () {
  // --- cookie utils (no regex) ---
  function getCookie(name){
    var cs = ('; ' + document.cookie).split('; ' + name + '=');
    if (cs.length < 2) return null;
    return decodeURIComponent(cs.pop().split(';').shift());
  }
  function setCookie(name, value){
    var parts = [
      name + '=' + encodeURIComponent(value),
      'Max-Age=31536000',
      'Path=/',
      'SameSite=Lax'
    ];
    if (location.protocol === 'https:') parts.push('Secure');
    try { if (location.hostname.endsWith('plura.io')) parts.push('Domain=.plura.io'); } catch(e){}
    document.cookie = parts.join('; ');
  }
  function mapLang(l){
    if (!l) return 'en';
    l = l.toLowerCase();
    if (l === 'ko' || l.indexOf('ko') === 0) return 'ko';
    if (l === 'ja' || l.indexOf('ja') === 0) return 'ja';
    return 'en';
  }

  // 헤더에서: <a href="/ko/" onclick="return jsSetCookie('ko')">한국어</a>
  window.jsSetCookie = function (lang) {
    var target = mapLang(lang);
    setCookie('px_lang', target);
    // 앵커 기본 이동 막음(돌아가기 이슈 방지)
    location.href = '/' + target + '/index.html';
    return false;
  };

  // 버튼 라벨/상태 갱신(선택)
  document.addEventListener('DOMContentLoaded', function(){
    var current = mapLang(getCookie('px_lang') || document.documentElement.getAttribute('lang'));
    var btn = document.querySelector('.header-right .lang > button, .header-right .lang-btn');
    if (btn) btn.textContent = (current === 'ko') ? '한국어' : (current === 'ja') ? '日本語' : 'English';
    try { document.documentElement.setAttribute('lang', current); } catch(e){}
  });
})();
