/* [URL] */
;(function($, window, document, undefined) {

  var r = $.carotte.slideshow;
  
  r.carousel = {
    options : {
      number:3,
      oneVisible:false
    }
  };
  
  $.fn.carousel = function(options) {
    
    options = $.extend({}, r.carousel.options, options);
    return this.each(function(){
      var slideshow = $(this),
          countElement = options.number,
          childs = slideshow.children(),
          docWidth = $(this).parent().width(),
          childsLength = childs.length,
          oneVisible = options.oneVisible,
          elementCarotte = $(self.element);
          
      if(childsLength > countElement && !oneVisible){
        for(var i = 0; i < childs.length; i=i+countElement) {
          childs
            .slice(i, i+countElement)
            .wrapAll('<div class="slide" style="float:left; width:'+docWidth+'px;"/>');
        }
        //If oneVisible is false  
        $('img').load(function(){
          childs.css({
            'width':100/countElement + '%'
          });
        });
        
      }else{
        slideshow.closest('.allCarotte').find('#navCarotte').remove();
        var widthElement;
        ($(window).width() > 400 ? widthElement = docWidth/countElement : widthElement = $(window).width());
          
        $('img').load(function(){
          childs
            .css({
              'width':widthElement + 'px',
              'float':'none',
              'display':'inline-block',
              'white-space':'normal',
              'vertical-align':'top'
            });
          slideshow.css({
            'width':'100%', 
            'white-space':'nowrap'
          }).attr('data-width',widthElement);
        });
        
      }
      
      $(window).resize(function(){
        var valueScreen = slideshow.closest('.allCarotte').width();
        function changeValue(value){
          childs.css({
            'width':value,
            'position':'relative'
          });
        }
        if(oneVisible){
          changeValue(widthElement);
          slideshow.attr('data-width',widthElement);
          if(valueScreen < widthElement) {
            changeValue(valueScreen);
            slideshow.attr('data-width',valueScreen);
          }
        }/*else {
          changeValue(docWidth);
        }*/
      });
      
    });
    
  };
  
})(jQuery, window, document);
