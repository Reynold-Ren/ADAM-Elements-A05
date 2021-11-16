'use strict';

(function ($) {

  var product1 = $('.product__section1').height();

  gsap.registerPlugin(ScrollTrigger);
  var tl = new TimelineMax();
  var scrollTl = new TimelineMax({
    scrollTrigger: {
      trigger: '.product__section1',
      toggleActions: 'play none none none',
      toggleClass: "active",
      markers: true
    }
  });

  scrollTl.to('.product__section1 .logo', 1, { opacity: 1, y: 0 });

  $('#btn1').click(function (e) {
    $('html,body').animate({
      scrollTop: $('#product__section1').offset().top - $('.product__fixedMenu').height()
    }, 1000);
  });

  $('#btn2').click(function (e) {
    $('html,body').animate({
      scrollTop: $('#product__spec').offset().top - $('.product__fixedMenu').height()
    }, 1000);
  });

  $('#btn3').click(function (e) {
    $('html,body').animate({
      scrollTop: $('#product__buy').offset().top - $('.product__fixedMenu').height()
    }, 1000);
  });

  window.addEventListener('scroll', winScroll);
  function winScroll(e) {
    var $now_Top = $(window).scrollTop();
    var $now_bottom = $now_Top + $(window).height();
    var $fixedMenu = $('.product_menu');
    var $fadeInAnimation = "animated fadeIn";
  }
})($);
//# sourceMappingURL=all.js.map
