'use strict';

var $ = jQuery;

var _init = {
  init: function(){
    _init.stickyMenu();
    _init.toggleMenu();
    _init.victoriesSlider();
    _init.ifTouch();
    _init.rating();
    _init.videoPopup();
    _init.teamSlider();
    _init.mapToggle();
    _init.scrollTo();
    _init.blogMenu();
    _init.testimonialSlider();
    _init.videoSlider();
    _init.accordionFunction();
    // _init.formFunction();
  },
  // formFunction: function(){
  //   $.validate({
  //     lang: 'en'
  //   });
  // },
  accordionFunction: function(){
    var allPanels = $('.accordion > dd').hide();
    $('.accordion > dt > a').click(function() {
      allPanels.slideUp();
      $(this).parent().next().slideDown();
      return false;
    });
  },
  videoSlider: function(){
    var owl = $('.home-testimonials__videos-wrap');
    owl.owlCarousel({
      autoHeight: true,
      smartSpeed: 500,
      responsive : {
        0 : {
          items: 1,
          slideBy: 1,
        },
        992 : {
          items: 2,
          slideBy: 2,
          margin: 50,
        }
      }
    });
    owlHack(owl);
  },
  testimonialSlider: function(){
    var owl = $('.home-testimonials__wrap');
    owl.owlCarousel({
      autoHeight: true,
      smartSpeed: 500,
      nav: true,
      navText: ['<i class="icon-chevron-left"></i>','<i class="icon-chevron-right"></i>'],
      responsive : {
        0 : {
          items: 1,
          slideBy: 1,
        },
        575 : {
          items: 2,
          slideBy: 2,
        },
        992 : {
          items: 3,
          slideBy: 3,
        },
        1439 : {
          items: 3,
          slideBy: 3,
        }
      }
    });
    owlHack(owl);
  },
  blogMenu: function(){
    var vw = $(window).width();
    if (vw > 767) {
      $('.blog-list li').hover(function(){
        $(this).find('ul').slideDown();
        $(this).addClass('active');
      }, function(){
        $(this).find('ul').slideUp();
        $(this).removeClass('active');
      });
    };
  },
  scrollTo: function(){
    $("a.scrollto").click(function() {
      var elementClick = $(this).attr("href")
      var destination = $(elementClick).offset().top - 80;
      jQuery("html:not(:animated),body:not(:animated)").animate({
        scrollTop: destination
      }, 800);
      return false;
    });
  },
  mapToggle: function(){
    var items = $('.toggle-map__item'),
        infos = $('.toggle-map__info');
    items.on('click', function(){
      if (!$(this).hasClass('active')) {
        items.each(function(){
          $(this).removeClass('active');
        });
        infos.each(function(){
          $(this).toggleClass('active');
        });
        $(this).addClass('active');
      }
    });
  },
  teamSlider: function(){
    $(window).on('load', function(){
      var owl = $('.home-team__wrap--slider');
      owl.owlCarousel({
        items: 3,
        autoHeight: true,
        // loop: true,
        // autoplay: true,
        // autoplayTimeout: 4000,
        smartSpeed: 500,
        // autoplayHoverPause: true,
        nav: true,
        navText: ['<i class="icon-chevron-left"></i>','<i class="icon-chevron-right"></i>'],
        responsive : {
          0 : {
            items: 2,
            margin: 10,
          },
          575 : {
            items: 3,
            margin: 20,
            slideBy: 3,
          },
          992 : {
            margin: 40,
            slideBy: 3,
          }
        }
      });
      owlHack(owl);
    });
  },
  videoPopup: function(){
    $('.video-popup').magnificPopup({
        // disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
    $('.text-popup').magnificPopup({
        // disableOn: 700,
        // type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        callbacks: {
          open: function() {
            $("html,body").toggleClass('menu-open');
          },
          close: function() {
            $("html,body").toggleClass('menu-open');
          }
        }
    });
  },
  rating: function(){
    var ratingWrap = $(".home-testimonials-item__rating");
    ratingWrap.each(function(){
      var rating = $(this).attr('data-rating');
      $(this).rateYo({
        fullStar: true,
        starWidth: "20px",
        rating: rating,
        readOnly: true,
        ratedFill: "#ffc900",
        normalFill: "#fff1b1",
        spacing: "5px",
        starSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>'
      });
    });
  },
  ifTouch: function(){
    if (touch()){
      $(".help-item, .results-item, .team-item").addClass('mobile');
    };
  },
  victoriesSlider: function(){
    var owl = $('#victories-slider');
    owl.owlCarousel({
      items: 3,
      margin: 5,
      autoheight: true,
      loop: true,
      // autoplay: true,
      // autoplayTimeout: 4000,
      smartSpeed: 500,
      // autoplayHoverPause: true,
      // nav: true,
      // navText: ['<i class="icon-chevron-left"></i>','<i class="icon-chevron-right"></i>'],
      responsive : {
        0 : {
          items: 1,
        },
        575 : {
          items: 2,
        },
        992 : {
          items: 3,
        }
      }
    });
    owlHack(owl);
  },
  toggleMenu: function(){
    var btn = $('#menu-btn'),
        menu = $('#nav-list');
    btn.on('click', function(){
      btn.toggleClass('active');
      menu.toggleClass('active');
      $("html,body").toggleClass('menu-open');
    });
  },
  stickyMenu: function(){
    var scroll = $(window).scrollTop(),
        menu = $('.main-nav');
    if (scroll > 0) {
      menu.addClass('scrollable');
    };
    $(window).on('scroll', function(){
      var scroll = $(window).scrollTop();
      if (scroll > 0) {
        menu.addClass('scrollable');
      } else {
        menu.removeClass('scrollable');
      }
    });
  }
};

$(document).ready(_init.init);

// Touch detecting
// Use: if (touch())

function touch() {
  if ("ontouchstart" in document.documentElement) {
    return true
  } else {
    return false
  }
}

function owlHack(owl) {
  var is_safari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
  if (is_safari) {
    $(window).on('load', function() {
      var height = owl.find('.owl-item.active').height();
      owl.find('.owl-height').height(height);
      console.log('test');
    });
  };
};