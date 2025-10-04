/* ===========================
   Header / Aside
=========================== */
let header = {
  init: function () {
    if ($('header .member-inner').length == 0) {
      $(window).scroll(function () {
        var top = $(this).scrollTop();
        if (top >= 250) {
          $('#top').addClass('show');
        } else {
          $('#top').removeClass('show');
        }
      });

      $(document).on("mouseenter", "header .has-depth", function () {
        $('header').addClass('hover');
        $('header .depth-bg, header .depth-menu').addClass('show');
        $(this).addClass('cur');
      });

      $(document).on("mouseleave", "header .has-depth", function () {
        $('header').removeClass('hover');
        $('header .depth-bg, header .depth-menu').removeClass('show');
        $(this).removeClass('cur');
      });
    }
  }
};

let aside = {
  init: function () {
    $(document).on('click', 'header .m-btn', function () {
      $('aside, .mask').addClass('show');
    });

    $(document).on('click', 'aside .btn-close', function () {
      $('aside, .mask').removeClass('show');
    });

    $(document).on('click', 'aside .has-depth', function () {
      $(this).toggleClass('cur');
      $(this).find('.depth-menu').slideToggle();
    });
  }
};

/* ===========================
   DOM Ready (공통 초기화)
=========================== */
$(function () {
  header.init();
  aside.init();

  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
    });
  }

  if (window.Fancybox) {
    Fancybox.bind("[data-fancybox]");
  }

  $(document).on('click', '#top', function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  $(document).on('click', '.lang button', function () {
    $(this).toggleClass('active').siblings('.depth').slideToggle();
  });
});

/* ===========================
   Swiper: 개별 슬라이더들
=========================== */
$(function () {
  new Swiper('.dashboard-slide', {
    slidesPerView: 1,
    speed: 1000,
    loop: true,
    effect: 'fade',
    autoplay: { delay: 2500 }
  });
});

$(function () {
  new Swiper('.img-slide', {
    slidesPerView: 1,
    speed: 1000,
    loop: true,
    effect: 'fade',
    autoplay: { delay: 1500 }
  });
});

function priceSlideInit() {
  new Swiper('.price-slide1', {
    slidesPerView: "4",
    speed: 1000,
    spaceBetween: 13,
    observer: true,
    observeParents: true,
    allowTouchMove: false,
    breakpoints: {
      768: { slidesPerView: "1.5", allowTouchMove: true }
    }
  });

  new Swiper('.price-slide2', {
    slidesPerView: "4",
    speed: 1000,
    spaceBetween: 13,
    observer: true,
    observeParents: true,
    allowTouchMove: false,
    breakpoints: {
      768: { slidesPerView: "1.5", allowTouchMove: true }
    }
  });

  new Swiper('.price-slide3', {
    slidesPerView: "4",
    speed: 1000,
    spaceBetween: 13,
    observer: true,
    observeParents: true,
    allowTouchMove: false,
    center: true,
    breakpoints: {
      768: { slidesPerView: "1.5", allowTouchMove: true }
    }
  });
}

$(function () {
  $('.pricing-tab button').click(function () {
    $('.pricing-tab button.cur').removeClass('cur');
    var index = $(this).parent('li').index() + 1;
    $(this).addClass('cur');

    $('.tab-content.cur').removeClass('cur');
    $('.tab-content.tab-' + index).addClass('cur');
  });

  new Swiper('.pricing-slide', {
    slidesPerView: "auto",
    speed: 1000,
    spaceBetween: 40,
    breakpoints: { 768: { spaceBetween: 30 } }
  });

  priceSlideInit();
});

$(function () {
  $('.fricing-tab button').click(function () {
    $('.fricing-tab button.cur').removeClass('cur');
    var index = $(this).parent('li').index() + 1;
    $(this).addClass('cur');

    $('.ftab-content.cur').removeClass('cur');
    $('.ftab-content.tab-' + index).addClass('cur');
  });

  new Swiper('.pricing-slide', {
    slidesPerView: "auto",
    speed: 1000,
    spaceBetween: 40,
    breakpoints: { 768: { spaceBetween: 30 } }
  });

  priceSlideInit();
});

$(function () {
  $('.fricing-tab01 button').click(function () {
    $('.fricing-tab01 button.cur').removeClass('cur');
    var index = $(this).parent('li').index() + 1;
    $(this).addClass('cur');

    $('.ftab-content01.cur').removeClass('cur');
    $('.ftab-content01.tab-' + index).addClass('cur');
  });

  new Swiper('.pricing-slide', {
    slidesPerView: "auto",
    speed: 1000,
    spaceBetween: 40,
    breakpoints: { 768: { spaceBetween: 30 } }
  });

  priceSlideInit();
});

$(function () {
  $('.fricing-tab02 button').click(function () {
    $('.fricing-tab02 button.cur').removeClass('cur');
    var index = $(this).parent('li').index() + 1;
    $(this).addClass('cur');

    $('.ftab-content02.cur').removeClass('cur');
    $('.ftab-content02.tab-' + index).addClass('cur');
  });

  new Swiper('.pricing-slide', {
    slidesPerView: "auto",
    speed: 1000,
    spaceBetween: 40,
    breakpoints: { 768: { spaceBetween: 30 } }
  });

  priceSlideInit();
});

$(function () {
  $('.fricing-tab03 button').click(function () {
    $('.fricing-tab03 button.cur').removeClass('cur');
    var index = $(this).parent('li').index() + 1;
    $(this).addClass('cur');

    $('.ftab-content03.cur').removeClass('cur');
    $('.ftab-content03.tab-' + index).addClass('cur');
  });

  new Swiper('.pricing-slide', {
    slidesPerView: "auto",
    speed: 1000,
    spaceBetween: 40,
    breakpoints: { 768: { spaceBetween: 30 } }
  });

  priceSlideInit();
});

$(function () {
  $('.fricing-tab button').click(function () {
    $('.fricing-tab button.cur').removeClass('cur');
    var index = $(this).parent('li').index() + 1;
    $(this).addClass('cur');

    $('.ftab-content.cur').removeClass('cur');
    $('.ftab-content.tab-' + index).addClass('cur');

    $('.fricing-tab button.cur').removeClass('cur');
    $('.fricing-tab button.pricebut-' + index).addClass('cur');
  });

  new Swiper('.pricing-slide', {
    slidesPerView: "auto",
    speed: 1000,
    spaceBetween: 40,
    breakpoints: { 768: { spaceBetween: 30 } }
  });

  priceSlideInit();
});

$(window).resize(function () {
  priceSlideInit();
});

$(function () {
  new Swiper('.contents-slide', {
    slidesPerView: 3,
    loop: true,
    autoplay: { delay: 3000 },
    speed: 1200,
    navigation: { nextEl: '.contents-slide-next', prevEl: '.contents-slide-prev' },
    breakpoints: {
      768: { slidesPerView: 'auto', spaceBetween: 0 },
      1024: { slidesPerView: 'auto', spaceBetween: 30 }
    }
  });

  new Swiper('.banner-slide', {
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    speed: 700,
    navigation: { nextEl: '.banner-slide-next', prevEl: '.banner-slide-prev' }
  });
});

$(function () {
  if ($('.customer-slide .swiper-slide').length > 0) {
    new Swiper('.customer-slide', {
      loop: true,
      speed: 1000,
      navigation: { nextEl: '.customer-slide-next', prevEl: '.customer-slide-prev' }
    });
  }
});

$(function () {
  $('.case-tab button').click(function () {
    $('.case-tab button.cur').removeClass('cur');
    var index = $(this).parent('li').index() + 1;
    $(this).addClass('cur');

    $('.tab-content.cur').removeClass('cur');
    $('.tab-content.tab-' + index).addClass('cur');
  });

  new Swiper('.case-slide', {
    slidesPerView: "auto",
    speed: 1000,
    spaceBetween: 40,
    breakpoints: { 768: { spaceBetween: 30 } }
  });

  new Swiper('.video-slide', {
    slidesPerView: 3,
    speed: 1000,
    spaceBetween: 26,
    loop: true,
    navigation: { nextEl: '.video-slide-next', prevEl: '.video-slide-prev' },
    breakpoints: { 768: { slidesPerView: 'auto', spaceBetween: 15 } }
  });
});

/* ===========================
   파트너(고객사 로고) 슬라이더
   - 동적 인클루드 후에만 1회 초기화
=========================== */
function initPartnerSwiper() {
  document.querySelectorAll('.partner-slide.swiper-container').forEach(function (el) {
    if (el.swiper) return; // 중복 방지
    new Swiper(el, {
      slidesPerView: 5,
      loop: true,
      speed: 1000,
      autoplay: { delay: 1500 },
      navigation: { nextEl: '.partner-slide-next', prevEl: '.partner-slide-prev' },
      // v5/6 호환 레이아웃 (grid는 옵션)
      breakpoints: {
        0: { slidesPerView: 3 },
        1024: { slidesPerView: 4 }
      }
    });
  });
}

/* ===========================
   HTML Partials 인클루드
   - DOM 생성 후 실행 보장
   - 주입 완료 시 initPartnerSwiper 호출
=========================== */
$(function () {
  $('[data-include-path]').each(function () {
    var $host = $(this);
    var path = $host.attr('data-include-path');
    // 개발 시 캐시 무력화가 필요하면 아래 줄 사용:
    // var url = path + (path.indexOf('?') === -1 ? '?v=' + Date.now() : '&v=' + Date.now());
    var url = path;

    $host.load(url, function (resp, status, xhr) {
      if (status !== 'success') {
        console.error('[include] failed:', path, status, xhr && xhr.status);
        return;
      }
      if (typeof initPartnerSwiper === 'function') initPartnerSwiper();
      if (window.AOS && AOS.refreshHard) { try { AOS.refreshHard(); } catch (e) {} }
    });
  });
});
