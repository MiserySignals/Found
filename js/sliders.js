const swiper = new Swiper('.hero__slider', {

   direction: 'horizontal',
   loop: true,
   autoHeight: false,
   autoplay: {
      delay: 4700,
   },

   pagination: {
      el: '.hero-swiper-control__pagination',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet hero-swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active hero-swiper-pagination-bullet-active',
      renderBullet: function (index, className) {
         return `<span class="${className}"><span class="hero-bullet-number hero-bullet-number_white">${String(index + 1).padStart(2, '0')}</span></span>`;
      },
   },

   navigation: {
      nextEl: '.hero-swiper-next',
      prevEl: '.hero-swiper-prev',
   },

});

const swiper_2 = new Swiper('.swiper-fund', {

   direction: 'horizontal',
   loop: true,
   autoHeight: false,
   autoplay: {
      delay: 4700,
   },

   pagination: {
      el: '.fund-swiper-control__pagination',
      clickable: true,
      renderBullet: function (index, className) {
         return `<span class="${className}"><span class="fund-bullet-number">${String(index + 1).padStart(2, '0')}</span></span>`;
      },
   },

   navigation: {
      nextEl: '.fund-swiper-next',
      prevEl: '.fund-swiper-prev',
   },

});

const swiper_news = new Swiper('.swiper-news', {
   direction: 'horizontal',
   loop: true,
   autoHeight: false,

   pagination: {
      el: '.swipertabs-control__pagination',
      clickable: true,
      bulletClass: 'swipetabs-pagination-bullet',
      bulletActiveClass: 'swipetabs-pagination-bullet-active',
      renderBullet: function (index, className) {
         return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
   },

   navigation: {
      nextEl: '.swipertabs-control__next',
      prevEl: '.swipertabs-control__prev',
   },
});

const swiper_company = new Swiper('.company-slider', {
   direction: 'horizontal',
   loop: true,
   autoHeight: false,
   autoplay: {
      delay: 4700,
   },
   pagination: {
      el: '.hero-swiper-control__pagination',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet company-swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active company-swiper-pagination-bullet-active',
      renderBullet: function (index, className) {
         return `<span class="${className}"><span class="hero-bullet-number hero-bullet-number_blue">${String(index + 1).padStart(2, '0')}</span></span>`;
      },
   },

   navigation: {
      nextEl: '.company-slider-navigation__next',
      prevEl: '.company-slider-navigation__prev',
   },
});

const swiper_philanthropists = new Swiper('.philanthropists-slider', {
   direction: 'horizontal',
   loop: true,
   autoHeight: false,
   pagination: {
      el: '.philanthropists-control__pagination',
      clickable: true,
      bulletClass: 'swipetabs-pagination-bullet',
      bulletActiveClass: 'swipetabs-pagination-bullet-active',
      renderBullet: function (index, className) {
         return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
   },

   navigation: {
      nextEl: '.philanthropists-control__next',
      prevEl: '.philanthropists-control__prev',
   },
});
