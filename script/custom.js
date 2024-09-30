function init() {
  let InitForMobile = false;
  let initForPC = false;

  $(window).resize(function () {
    /* Tablet, PC */
    if ($(window).innerWidth() > 767) {
      InitForMobile = false;
      if (!initForPC) {
        $('.mega-navi-item-wrap, .link-item-content, address').css(
          'display',
          'block'
        );
        $('.mega-navi').css({ left: 0, display: 'none' });
        initForPC = true;
      }
    } else {
      /* Mobile */
      initForPC = false;
      if (!InitForMobile) {
        $('.mega-navi-item-wrap, .link-item-content, address').css(
          'display',
          'none'
        );
        $('.link-item-title').removeClass('active');
        $('.mega-navi').css({ left: -300, display: 'block' });
        InitForMobile = true;
      }
    }
  });
}

init();

/* Include Components */
$('.header-include').load('/include/header.html', function () {
  $(window)
    .resize(function () {
      /* Tablet, PC */
      if ($(window).innerWidth() > 767) {
        /* Toggle Mega Navigation */
        $('.gnb .trigger, section').off('click');
        $('.gnb .trigger').on('click', function () {
          $('.mega-navi').slideToggle();
        });
        $('section').on('click', function () {
          $('.mega-navi').slideUp();
        });
      } else {
        /* Mobile */
        /* Toggle Mega Navigation */
        $('.gnb .trigger, section, .btn-mega-navi-close').off('click');
        $('.gnb .trigger').on('click', function () {
          $('.mega-navi').animate({ left: 0 }, 300);
        });
        $('section, .btn-mega-navi-close').on('click', function () {
          $('.mega-navi').animate({ left: -300 }, 300);
        });
      }
    })
    .resize();

  /* Mega Navigation Accordion - Mobile */
  $('.mega-navi-item b').click(function () {
    $(this).next().stop().slideToggle();
    $(this).toggleClass('active');
  });

  /* Password Input Type Toggle */
  $('.toggle-pw').click(function () {
    $(this).toggleClass('bi-eye');
    const $input = $(this).prev();
    $input.attr(
      'type',
      $input.attr('type') === 'password' ? 'text' : 'password'
    );
  });

  /* Login Modal */
  $('header .btn-login, .signup-box .go-to-another a').click(function (e) {
    e.preventDefault();
    $('.login-box-overlay').show();
  });
  $('.btn-modal-close, .modal-overlay').click(function (e) {
    if (e.target !== this) return;
    $('.modal-overlay').hide();
  });

  /* After Login Header UI */
  $('.login-box .btn-account-form').on('click', function () {
    $('.login-box-overlay').fadeOut();
    $('header .user-alarm').show();
    $('header .login-register-buttons').hide();
  });
});

$('.footer-include').load('/include/footer.html', function () {
  $('.link-item-title').on('click', function () {
    $(this).next().slideToggle(200);
    $(this).toggleClass('active');
  });
  $('.address-trigger--mobile').on('click', function () {
    $('address').toggle();
  });
});

/*
 * Front Page - index.html
 */

/* Front Slider */
new Swiper('.front-slider', {
  loop: true,
  autoplay: { delay: 5000, pauseOnMouseEnter: true },
  speed: 1000,
});

/* Focus Class Slider */
$('.focus-class-slider').each((i, slider) => {
  new Swiper(slider, {
    speed: 500,
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
      nextEl: `.swiper-navi-next-${i}`,
      prevEl: `.swiper-navi-prev-${i}`,
    },
    breakpoints: {
      767: {
        loop: true,
        slidesPerView: 3,
      },
      1024: {
        loop: true,
        slidesPerView: 4,
      },
    },
  });
});

/* Class Card UI Like Button */
$('.like').click(function (e) {
  e.stopPropagation();
  $(this).toggleClass('active');
});

/* Early Bird Countdown */
$('#early-bird-countdown').countdown('2024/12/01', function (event) {
  $(this).html(
    event.strftime(
      '<b>종료까지</b> %D일 <span>%H</span> : <span>%M</span> : <span>%S</span> 남음'
    )
  );
});

/* Front Event Banner Close */
$('.front-event-banner .close-btns button').on('click', function () {
  $('.front-event-banner').hide();
});

/*
 * Category Main Page - category-main.html
 */

/* Category Detail Buttons */
$('.btn-shortcut').click(function () {
  $(this).toggleClass('active');
  $(this).siblings().removeClass('active');
});

/*
 * Take Course Page - take-course.html
 */

/* Cart Clear Buttons */
$('.cart-item .btn-clear').click(function () {
  $(this).parents('.cart-item').remove();
  if ($('.cart-item').length === 0) {
    $('.cart-empty-msg').show();
    $('.cart-header').hide();
  }
});
$('.cart .btn-clear-all').click(function () {
  $('.cart-item').remove();
  $('.cart-empty-msg').show();
  $('.cart-header').hide();
});

/* Cart Select Buttons */
$('.cart .cart-check-all').click(function () {
  $('.check-status .cart-check').prop('checked', this.checked);
});

/*
 * Class Detail Page - class-detail.html
 */

/* Class Share Modal */
$('.btn-class-share').click(function () {
  $('.class-share-overlay').show();
});
$('.class-share-overlay .copy-link').click(function () {
  $('.class-share-overlay .copy-link-notice').show();
});

/* Class Detail Navigation */
$('.class-detail-navi a').click(function (e) {
  e.preventDefault();
  $(this).addClass('active').siblings().removeClass('active');
  /* Smooth Scrolling */
  const linkLocation = $(this).attr('href');
  $('html, body').animate(
    {
      scrollTop: $(linkLocation).offset().top - $('header').height(),
    },
    500
  );
});

/* Article :  Class Curriculum */
$('.chapter-title').click(function () {
  $(this).next().toggle();
  $(this).toggleClass('active');
});

/* Article :  Class Faq */
$('.faq-title').click(function () {
  $(this).next().slideToggle(200);
});

/* Go To Top */
$(window).scroll(function (e) {
  if ($(this).scrollTop() > 500) {
    $('.gototop').addClass('active');
  } else {
    $('.gototop').removeClass('active');
  }
});
$('.gototop').click(function () {
  $('html, body').animate({ scrollTop: 0 }, 500);
});

/* Cart Confirm */
$('.btn-cart').on('click', function () {
  $('.cart-confirm').show();
  setTimeout(() => $('.cart-confirm').hide(), 3000);
});
$('.cart-confirm .btn-close').on('click', function () {
  $('.cart-confirm').hide();
});

/* Like Button */
$('.class-detail-sidebar .btn-like').on('click', function () {
  $(this).children().toggleClass('bi-heart bi-heart-fill');
});
