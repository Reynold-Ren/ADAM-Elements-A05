'use strict';

(function ($) {

  TweenMax.set($('.ani'), { scale: 0.9, alpha: 0 });

  window.addEventListener('scroll', winScroll);
  function winScroll(e) {
    var $now_Top = $(window).scrollTop();
    var $now_bottom = $now_Top + $(window).height();
    var $fixedMenu = $('.product_menu');
    var $fadeInAnimation = "animated fadeIn";
  }

  $('.slide').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: false,
    fade: true,
    responsive: [{
      breakpoint: 569,
      settings: {
        dots: false
      }
    }]
  });
})($);
//# sourceMappingURL=all.js.map
