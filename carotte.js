// jQuery Plugin carotte - Responsive Accessible Slider
// version 2.0, Avril 30 2013
// by Thomas LEBEAU

;(function ( $, window, document, undefined ) {
    
    $.carotte = $.carotte || {};
    
    $.carotte.slideshow = {
      options : {
        duration: 400,
        textPrev:'prev',
        textNext:'next'
      }
    }

    // The actual plugin constructor
    function PlugCarotte(element, options ) {
        this.element = element;
        var self = this,
            $element = $(self.element),
            id = element.id,
            classRas = element.className.split(' '),
            classRas = classRas[0],
            identiant;
            (id ? identiant = id : identiant = classRas )
            
            $element.wrap('<div class="allCarotte AllCarotte-'+identiant+'"/>')
        
        self.init(options, identiant);
        
        //Public functions
        $.fn.carotte.slide = function(el, direction, time){
          self.slide(el, direction, time);
        }
    }
    
    PlugCarotte.prototype = {
      init: function(options, id){
        // if more than one items
        var self = this,
            $element = $(self.element),
            childs = $element.children(),
            navigation = '<div class="navCarotte"><button class="btnSlideCarotte prev">'+options.textPrev+'</button><button class="btnSlideCarotte next">'+options.textNext+'</button></div>',
            childLength = childs.length,
            $elementParent = $element.parent();
            $element.wrap('<div class="carotteContainer CarotteContainer-'+id+'" style="width:100%; overflow:hidden;"/>'),
            $CarotteContainer = $element.parent();
        
        if(childLength > 1){
              
          // append navigation for Slide
          $CarotteContainer.before(navigation); 
          
          var $navCarotte = $CarotteContainer.prev('.navCarotte'),
              $CarotteSlideshow = $navCarotte.next().children(),
              elementCarotte = $(self.element),
              childs = elementCarotte.children(),
              Carotteparent = elementCarotte.parent(),
              WinWidth = $(window).width();
          
          var docWidth = Math.ceil($elementParent.width()),
              childsWidth = docWidth;
          
          childs.css({
            'float':'left',
            'position':'relative',
            'width':docWidth
          }).each(function(e){
            $(this).attr('data-slide',e);
          });
          
          
          //append Size element Carotte   
          elementCarotte.css({
              'width':childsWidth*childLength
            }).attr('data-width',childsWidth);
          
          $('img').load(function(){
            self.heightElement(childs, elementCarotte);
            elementCarotte.css({
              'width':docWidth*childLength
            }).attr('data-width',docWidth);
            childs.css({
              'width':docWidth,
              'position':'relative'
            });
          });
          
          
          
          //Evenement navigation
          $navCarotte.find('.prev').bind('click', function(){
            var time = options.duration,
                anim = options.animation;
            
            self.slide($CarotteSlideshow, 'prev', time, 'null');   
          });
          
          $navCarotte.find('.next').bind('click', function(){
            var time = options.duration,
                anim = options.animation;
              
            self.slide($CarotteSlideshow, 'next', time, 'null');
          });
          
          //if User resize window
          $(window).resize(function(){
            var docWidth = Carotteparent.width();
            self.resizeMe(elementCarotte, docWidth, childLength);
          });

        }
      },
      // Slide Method
      slide: function(el, direction, duration) {
        var dataWidth = el.data('width'),
            elWidth = el.width(),
            firstSlide = el.children(':first'),
            lastSlide = el.children(':last'),
            navMultiple = $('.navMultiple');
        
        function addClassNav() {
          var navSelected = el.find('.activeSlide').data('slide');
              navMultiple.find('.active').removeClass('active');
              navMultiple.find('button:eq('+navSelected+')').addClass('active');
        }
        
        if(el.hasClass('navRas')) {   
          if(direction == 'prev') {
            var prev = el.find('.activeSlide').prev(),
                left = prev.data('left');
            
            if(prev.length == 0) {
              el.animate({
              'margin-left':'-'+lastSlide.data('left')
              }, function(){
                el.find('.activeSlide').removeClass('activeSlide');
                lastSlide.addClass('activeSlide');
                addClassNav();
              });
            }else {
              el.animate({
                'margin-left':'-'+left
              }, function(){
                el.find('.activeSlide').removeClass('activeSlide');
                prev.addClass('activeSlide');
                addClassNav();
              });
            }
            
          } else if(direction == 'next') {
            var next = el.find('.activeSlide').next(),
                left = next.data('left');
            
            if(next.length == 0) {
              el.animate({
              'margin-left':0
              }, function(){
                el.find('.activeSlide').removeClass('activeSlide');
                firstSlide.addClass('activeSlide');
                addClassNav();
              });
            }else {
              el.animate({
                'margin-left':'-'+left
              }, function(){
                el.find('.activeSlide').removeClass('activeSlide');
                next.addClass('activeSlide');
                addClassNav();
              });
            }
          }
          
        }else {
          // Prev Direction
          if(direction == 'prev') {
            el.children().css({'margin-left':0})
            lastSlide.prependTo(el).css({
              'margin-left': '-'+dataWidth+'px'
            }).animate({
              'margin-left': 0
            }, duration);
            
          // Next Direction
          } else if( direction == 'next') {
            firstSlide
              .animate({
               'margin-left': '-'+dataWidth+'px'
              }, duration, function(){
                $(this).css({'margin-left':0}).appendTo(el);
                el.children().each(function(e){
                  $(this).attr('data-left', dataWidth*e);
                });
              })
          }
        }
      },
      //heightElement Method
      heightElement: function(element, parentElement) {
        var h = 0;
        element.each(function(){
          var hTallest = $(this).height();
          if(hTallest > h){
            h = hTallest;
          }
        });
        //Attribute heigth element and Container
        parentElement.height(h);
        parentElement.parent().height(h).attr('data-height', h);
      },
      //Resize Method
      resizeMe: function(element, valueScreen, childLength) {
        var childs = element.children();
        
        var docWidth = valueScreen,
            childsWidth = docWidth;
        element.css({
          'width':valueScreen*childLength
        }).attr('data-width',valueScreen);
        childs.css({
          'width':valueScreen,
          'position':'relative'
        });
        this.heightElement(childs, element);
      }
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.carotte = function (options) {
      options = $.extend({}, $.carotte.slideshow.options, options);
        return this.each(function () {
          new PlugCarotte(this, options);
        });
    };

})( jQuery, window, document );
