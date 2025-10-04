(function () {
  // 쿠키 유틸
  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([$?*|{}()[\\]\\/+^])/g,'\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function setLangCookie(lang) {
    var maxAge = 31536000; // 1년
    var parts = [
      'lang=' + encodeURIComponent(lang),
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

  function mapLang(lang) {
    if (!lang) return 'en';
    var l = lang.toLowerCase();
    if (l === 'ko' || l.startsWith('ko')) return 'ko';
    if (l === 'ja' || l.startsWith('ja')) return 'ja';
    return 'en';
  }

  // 공개 함수: 헤더의 언어 선택에서 호출 (예: onClick="jsSetCookie('ja')")
  window.jsSetCookie = function (lang) {
    var target = mapLang(lang);
    setLangCookie(target);
    // 현재 도메인에서 언어 경로로 이동 (원하면 www 유무 맞춰 조정)
    location.href = '/' + target + '/';
  };

  // 선택사항: 헤더의 언어 버튼 텍스트/상태를 쿠키 기준으로 갱신
  function updateLangButton() {
    var current = mapLang(getCookie('lang') || (document.documentElement.getAttribute('lang') || ''));
    var label = (current === 'ko') ? '한국어' : (current === 'ja') ? '日本語' : 'English';
    var btn = document.querySelector('.header-right .lang > button, .header-right .lang-btn');
    if (btn) btn.textContent = label;
    // <html lang>도 정합성 맞추고 싶다면:
    try { document.documentElement.setAttribute('lang', current); } catch (e) {}
  }
  document.addEventListener('DOMContentLoaded', updateLangButton);
})();
