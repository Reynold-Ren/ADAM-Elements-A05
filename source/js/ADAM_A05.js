(function ($) {

  gsap.set(
    ['.product__section1 .logo',
    '.product__section3 .textArea',
    '.product__section4 .logo',
    '.product__section4 .first', 
    '.product__section4 .second', 
    '.product__section4 .third', 
    '.product__section5 .logo', 
    '.product__section7 .textArea', 
    '.product__section9 .first', 
    '.product__section9 .second', 
    '.product__section9 .third', 
    '.product__section9 .fourth'], {opacity: 0});
  gsap.set('.product__section4 .progress span', { width: '0%' });

  gsap.registerPlugin(ScrollTrigger);
  const scrollSection4Tl = new TimelineMax({
    scrollTrigger: {
      trigger: '.product__section4',
      toggleActions: 'play none none none',
    }
  })

  const scrollSection9Tl = new TimelineMax({
    scrollTrigger: {
      trigger: '.product__section9',
      toggleActions: 'play none none none',
    }
  })

  gsap.to('.product__section1 .logo', {
    scrollTrigger: {
      trigger: '.product__section1',
      toggleActions: 'play none none none',
      start: "top center",
    },
    opacity: 1,
    duration: 1
  })

  gsap.to('.product__section3 .textArea', {
    scrollTrigger: {
      trigger: '.product__section3',
      toggleActions: 'play none none none',
      start: "top center",
    },
    opacity: 1,
    duration: 1
  })

  scrollSection4Tl.to('.product__section4 .logo', 1, {opacity: 1})
          .to('.product__section4 .progress span', 1, { width: '100%'}, '+=0.5')
          .to('.product__section4 .first', .7, { opacity: 1 })
          .to('.product__section4 .second', .7, { opacity: 1 })
          .to('.product__section4 .third', .7, { opacity: 1 })

  gsap.to('.product__section5 .logo', {
    scrollTrigger: {
      trigger: '.product__section5',
      toggleActions: 'play none none none',
      start: "top center",
    },
    opacity: 1,
    duration: 1
  })

  gsap.to('.product__section7 .textArea', {
    scrollTrigger: {
      trigger: '.product__section7',
      toggleActions: 'play none none none',
      start: "top center",
    },
    opacity: 1,
    duration: 1
  })

  gsap.to('.product__section7 .textArea', {
    scrollTrigger: {
      trigger: '.product__section7',
      toggleActions: 'play none none none',
      start: "top center",
    },
    opacity: 1,
    duration: 1
  })
  
  scrollSection9Tl.to('.product__section9 .first', .7, {opacity: 1})
  .to('.product__section9 .third', .7, { opacity: 1 })
  .to('.product__section9 .second', .7, { opacity: 1 })
  .to('.product__section9 .fourth', .7, { opacity: 1 })


  $('#btn1').click(function (e) {
    $('html,body').animate(
      {
        scrollTop: $('#product__section1').offset().top - $('.product__fixedMenu').height(),
      },
      1000
    )
  })

  $('#btn2').click(function (e) {
    $('html,body').animate(
      {
        scrollTop: $('#product__spec').offset().top - $('.product__fixedMenu').height(),
      },
      1000
    )
  })

  $('#btn3').click(function (e) {
    $('html,body').animate(
      {
        scrollTop: $('#product__buy').offset().top - $('.product__fixedMenu').height(),
      },
      1000
    )
  })
 
  window.addEventListener('scroll',winScroll);
  function winScroll(e){
    let $now_Top = $(window).scrollTop();
    let $now_bottom = $now_Top+$(window).height();
    let $fixedMenu = $('.product_menu');
    let $fadeInAnimation = "animated fadeIn";

  }
})($);