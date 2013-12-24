/* [URL] */
;(function($, window, document, undefined) {

  var r = $.carotte.slideshow;
  
  r.autoslide = {
    options : {
      time:2000,
      textPlay:'play',
      textPause:'pause',
      duration:700
    }
  };
  
  $.fn.autoslide = function(options) {
    
    options = $.extend({}, r.autoslide.options, options);
    return this.each(function(){
      var slideshow = $(this),
          parentSlideshow = $(this).parent().parent(),
          navAutoSlide = '<button id="playCarotte">'+options.textPlay+'</button><button id="stopCarotte">'+options.textPause+'</button>',
          navCarotte = parentSlideshow.find('#navCarotte');
      
      navCarotte.append(navAutoSlide);
      
      var playBtn = navCarotte.find('#playRas'),
          stopBtn = navCarotte.find('#stopRas')
      
      stopFct = function() {
        autoSlideShow = clearInterval(autoSlideShow);
      };
      
      playFct = function() {
        autoSlideShow = setInterval(function(){$.fn.carotte.slide(slideshow, 'next', options.duration)}, options.time);
      };
      
      //Slide
      playFct();
      
      //button to slide
      playBtn.bind('click', function(){
        playFct();
      });
      
      //button to stop slide
      stopBtn.bind('click', function(){
        stopFct();
      });
       
      
    });
    
  };
  
})(jQuery, window, document);