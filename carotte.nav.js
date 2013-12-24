/* [URL] */
;(function($, window, document, undefined) {

  var r = $.carotte.slideshow;
  
  r.nav = {
    options : {}
  };
  
  $.fn.nav = function(options) {
    
    options = $.extend({}, r.nav.options, options);
    return this.each(function(){
      var self = this,
          container = $(self),
          navigation = container.closest('.allCarotte').find('#navCarotte'),
          childs = container.children(),
          dataW = container.data('width'),
          numberChild = childs.length;
      container.addClass('navRas');
      container.children().eq(0).addClass('activeSlide');
      container.children().each(function(e){
        $(this).attr('data-left', dataW*e);
      });

      navigation.each(function(){
        $(this).prepend('<div id="navMultiple"/>');
      });

      var navMultiple = navigation.find("#navMultiple");
      
      for(var i = numberChild; i>=1; i--) {
        navMultiple.prepend('<button data-slide="'+(i-1)+'">'+i+'</button>');
      }
      
      navMultiple.find('button:eq(0)').addClass('active');
      
      navMultiple.find('button').each(function(e){
        var slide = $(this).data('slide');
        $(this).click(function(){
          navMultiple.find('.active').removeClass('active');       
          $(this).addClass('active');
          var childSelected = container.children().eq(slide),
              leftContainer = childSelected.data('left');

          container.find('.activeSlide').removeClass('activeSlide');
          childSelected.addClass('activeSlide');
          container.animate({
            'margin-left': -leftContainer
          })
        })
      });
      
    });
    
  };
  
})(jQuery, window, document);
