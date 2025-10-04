# Language Cookie Guide — `px_lang`

`px_lang`는 사이트 언어를 기억하기 위한 1년짜리 쿠키입니다.  
값은 `ko`, `ja`, `en` 중 하나로 저장됩니다.

---

## 쿠키 정책

* **쿠키 이름:** `px_lang`
* **값:** `ko` | `ja` | `en`
* **범위:** `Domain=.plura.io`, `Path=/`
* **만료:** `Max-Age=31536000` (1년)
* **보안:** `SameSite=Lax` + *(HTTPS에서만)* `Secure`

---

## 동작 개요

1. **처음 방문(루트 `/` 또는 `/index.html`)**

   * 쿠키가 없으면 브라우저 언어(`navigator.language`)로 `ko/ja/en` 결정
   * `px_lang` 쿠키 저장 후 `/{lang}/index.html`로 이동
2. **언어 메뉴에서 수동 변경**

   * `jsSetCookie('ko'|'ja'|'en')` 호출 → `px_lang` 저장 → 해당 언어 경로로 이동
3. **이미 언어 경로(`/ko`, `/ja`, `/en`)에 있음**

   * 페이지 로드시 쿠키만 보정하고 리디렉트하지 않음(루프 방지)

---

## 사용 방법

### 1) 루트 리디렉터 (`/index.html`) 예시

```html
<script>
(function(){
  function getCookie(name){
    var cs=('; '+document.cookie).split('; '+name+'=');
    return cs.length<2 ? null : decodeURIComponent(cs.pop().split(';').shift());
  }
  function setCookie(name,val){
    var parts=[name+'='+encodeURIComponent(val),'Max-Age=31536000','Path=/','SameSite=Lax'];
    if(location.protocol==='https:') parts.push('Secure');
    try{ if(location.hostname.endsWith('plura.io')) parts.push('Domain=.plura.io'); }catch(e){}
    document.cookie=parts.join('; ');
  }
  function mapLang(l){ l=(l||'en').toLowerCase(); return l.startsWith('ko')?'ko':l.startsWith('ja')?'ja':'en'; }

  document.addEventListener('DOMContentLoaded',function(){
    var m = /^\/(ko|ja|en)(\/|$)/.exec(location.pathname);
    if (m) { if(getCookie('px_lang')!==m[1]) setCookie('px_lang', m[1]); return; }

    var lang = getCookie('px_lang') || mapLang(navigator.language || navigator.userLanguage);
    setCookie('px_lang', lang);
    location.replace('/'+lang+'/index.html');
  });
})();
</script>
```

### 2) 헤더 언어 선택 (`/res/js/header-lang.js`) 예시

```html
<!-- 예: 드롭다운 항목 -->
<a href="/ko/" onclick="return jsSetCookie('ko')">한국어</a>
<a href="/en/" onclick="return jsSetCookie('en')">English</a>
<a href="/ja/" onclick="return jsSetCookie('ja')">日本語</a>

<script>
(function(){
  function setCookie(name,val){
    var parts=[name+'='+encodeURIComponent(val),'Max-Age=31536000','Path=/','SameSite=Lax'];
    if(location.protocol==='https:') parts.push('Secure');
    try{ if(location.hostname.endsWith('plura.io')) parts.push('Domain=.plura.io'); }catch(e){}
    document.cookie=parts.join('; ');
  }
  window.jsSetCookie=function(lang){
    var t = (lang==='ko')?'ko':(lang==='ja')?'ja':'en';
    setCookie('px_lang', t);
    location.href = '/'+t+'/index.html';
    return false; // 기본 링크 이동 방지
  };
})();
</script>
```

> 각 언어 폴더(`/ko`, `/ja`, `/en`)에는 **실제 컨텐츠의 `index.html`**이 있어야 합니다.
> 리디렉트 전용 “Loading…” 파일을 넣으면 멈춘 것처럼 보일 수 있습니다.

---

## 확인 방법

* **DevTools → Application/Storage → Cookies → [https://plura.io](https://plura.io)**
  `px_lang`의 Value/Domain/Path/Expires/SameSite/Secure 확인
* **Console**

  ```js
  document.cookie; // 문자열 전체
  ('; '+document.cookie).split('; px_lang=').pop()?.split(';').shift(); // 값만
  ```

---

## 트러블슈팅

* **HTTPS가 아니면 `Secure` 쿠키가 저장되지 않음** → 테스트는 `https://`에서.
* **언어 폴더에 실제 페이지가 없으면** 계속 “Loading…” 보일 수 있음 → `/ko/index.html` 등 배포 확인.
* **JS 미적용 대비**를 위해 앵커에 `href="/ko/"` 등 유효 경로를 넣고, `onclick="return jsSetCookie('ko')"`로 덮어쓰기 권장.
* 기존 `lang`/`LANG` 쿠키가 있다면 충돌 방지를 위해 제거:

  ```js
  document.cookie='lang=; Max-Age=0; Path=/; Domain=.plura.io';
  document.cookie='LANG=; Max-Age=0; Path=/; Domain=.plura.io';
  ```

---

## 요약

* 사용자 언어 선택 시 **`px_lang=ko|ja|en`** 쿠키를 **`.plura.io` 전역**으로 저장  
* 루트 `/` 진입 시 `px_lang` 기반으로 **해당 언어 경로로 이동**  
* 각 언어 디렉터리에 **실제 컨텐츠**를 배포하면 끝!
