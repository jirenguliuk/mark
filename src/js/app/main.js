      requirejs.config({
        baseUrl: 'src/js',
        paths: {
          'jquery': 'lib/jquery-3.2.1.min',
   
        }
 
      });
      requirejs(['app/index'])
      /*
      requirejs(['jquery','carousel', 'gotop', 'waterfall'], 
        function($,Carousel, GoTop, Waterfall){

         Carousel.init($('.carousel'));
        new GoTop();
        Waterfall.init($('.load-more'), Waterfall.callback);
      });*/
