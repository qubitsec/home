(function () {
  /* ---------- cookie utils (no regex) ---------- */
  function getCookie(name){
    var cs=('; '+document.cookie).split('; '+name+'=');
    return cs.length<2 ? null : decodeURIComponent(cs.pop().split(';').shift());
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

  /* ---------- mapping ---------- */
  function mapLang(lang){
    if (!lang) return 'en';
    var l = lang.toLowerCase();
    if (l === 'ko' || l.indexOf('ko') === 0) return 'ko';
    if (l === 'ja' || l.indexOf('ja') === 0) return 'ja';
    return 'en';
  }
  function mapRegionFromLang(lang){
    return (lang === 'ja') ? 'jp' : 'kr'; // ko→kr, ja→jp, 기타→kr
  }

  // 헤더 드롭다운에서: <a href="/ko/" onclick="return jsSetCookie('ko')">한국어</a>
  window.jsSetCookie = function (lang) {
    var targetLang = mapLang(lang);
    var targetRegion = mapRegionFromLang(targetLang);
    setCookie('px_lang', targetLang);
    setCookie('px_region', targetRegion);

    // 언어 경로로 이동 (실제 컨텐츠가 있어야 함)
    location.href = '/' + targetLang + '/index.html';
    return false; // 기본 a[href] 이동 막기
  };

  // 선택사항: 버튼 라벨/상태 동기화
  document.addEventListener('DOMContentLoaded', function(){
    var curLang = mapLang(
      getCookie('px_lang') || document.documentElement.getAttribute('lang')
    );
    var btn = document.querySelector('.header-right .lang > button, .header-right .lang-btn');
    if (btn) btn.textContent = (curLang === 'ko') ? '한국어' : (curLang === 'ja') ? '日本語' : 'English';

    try { document.documentElement.setAttribute('lang', curLang); } catch(e){}

    // region 쿠키가 없으면 언어 기준으로 보정
    if (!getCookie('px_region')) setCookie('px_region', mapRegionFromLang(curLang));
  });
})();
