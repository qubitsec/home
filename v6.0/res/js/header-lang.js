(function () {
  // lang 쿠키 읽기(선택사항)
  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([$?*|{}()[\]\\/+^])/g,'\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  // 언어 선택: 쿠키 저장(옵션) + 규칙에 맞춰 이동
  window.jsSetCookie = function (lang) {
    // 규칙: ko → /ko, ja → /ja, 그 밖(영어 포함) → /en
    var target = (lang === 'ko') ? 'ko' : (lang === 'ja') ? 'ja' : 'en';

    // 쿠키는 현재 도메인 기준으로 저장(로컬/스테이징에서도 동작)
    var maxAge = 60 * 60 * 24 * 365; // 1년
    var cookie = 'lang=' + encodeURIComponent(target) + '; Max-Age=' + maxAge + '; Path=/; SameSite=Lax; Secure';

    // plura.io에서만 상위 도메인 지정(로컬 개발 시엔 생략)
    try {
      if (location.hostname.endsWith('plura.io')) {
        cookie += '; Domain=.plura.io';
      }
    } catch (e) {}

    document.cookie = cookie;

    // 선택 즉시 이동
    location.href = 'https://www.plura.io/' + target;
  };

  // 선택사항: 헤더 버튼 라벨을 쿠키 기준으로 갱신
  function updateLangButton() {
    var current = getCookie('lang') || 'ko';
    var label = (current === 'ko') ? '한국어' : (current === 'ja') ? '日本語' : 'English';
    var btn = document.querySelector('.header-right .lang > button');
    if (btn) btn.textContent = label;
  }
  document.addEventListener('DOMContentLoaded', updateLangButton);
})();
