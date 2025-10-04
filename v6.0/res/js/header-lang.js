(function () {
  function getCookie(n){var m=document.cookie.match(new RegExp('(?:^|; )'+n.replace(/([$?*|{}()[\\]\\/+^])/g,'\\$1')+'=([^;]*)'));return m?decodeURIComponent(m[1]):null}
  function setCookie(n,v){var parts=[n+'='+encodeURIComponent(v),'Max-Age=31536000','Path=/','SameSite=Lax'];if(location.protocol==='https:')parts.push('Secure');try{if(location.hostname.endsWith('plura.io'))parts.push('Domain=.plura.io')}catch(e){}document.cookie=parts.join('; ')}
  function mapLang(l){if(!l)return'en';l=l.toLowerCase();if(l==='ko'||l.startsWith('ko'))return'ko';if(l==='ja'||l.startsWith('ja'))return'ja';return'en'}

  function go(lang){
    var origin = location.origin;
    var list = [
      origin + '/' + lang + '/index.html',
      origin + '/' + lang + '/',
      'https://www.plura.io/' + lang + '/index.html',
      'https://www.plura.io/' + lang + '/'
    ];
    // 첫 후보로 이동 후, 800ms 내 타이틀이 안 바뀌면 폴백
    document.title = 'Redirecting...';
    location.href = list[0];
    setTimeout(function(){
      if (document.title && document.title.toLowerCase().indexOf('redirecting') !== -1) {
        location.href = list[2];
      }
    }, 800);
  }

  // 헤더에서 onClick="jsSetCookie('ja')" 사용
  window.jsSetCookie = function (lang) {
    var target = mapLang(lang);
    setCookie('px_lang', target);
    go(target);
  };

  // 버튼 라벨 동기화(선택)
  document.addEventListener('DOMContentLoaded', function(){
    var current = mapLang(getCookie('px_lang') || (document.documentElement.getAttribute('lang') || ''));
    var label = (current === 'ko') ? '한국어' : (current === 'ja') ? '日本語' : 'English';
    var btn = document.querySelector('.header-right .lang > button, .header-right .lang-btn');
    if (btn) btn.textContent = label;
    try { document.documentElement.setAttribute('lang', current); } catch(e){}
  });
})();
