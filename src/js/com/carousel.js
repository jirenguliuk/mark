  define(['jquery'], function($) {
      function Carousel($ct) {
            this.$ct = $ct;
            var _this = this;
            this.bnit();
            this.bind();
           
           setInterval(function(){
            _this.playNext(1)
        }, 3000)
          }
  Carousel.prototype.bnit=function(){
     var $imgCt=this.imgCt=this.$ct.find('.img-ct')
    var $imgs =this.imgs=this.$ct.find('.img-ct>li')
    var $preBtn =this.preBtn= this.$ct.find(' .pre')
    var $nextBtn =this.nextBtn= this.$ct.find(' .next')
    var $bullets =this.bullets= this.$ct.find(' .bullet>li')
    this.imgCount = $imgCt.children().length
    this.imgWidth = $imgs.width()
    this.pageIndex = 0
    this.isAnimate = false;

    $imgCt.append($imgs.first().clone());
    $imgCt.prepend($imgs.last().clone());
    $imgCt.width((this.imgCount + 2)*this.imgWidth);
    $imgCt.css({left:-this.imgWidth});

    
  }
  
  Carousel.prototype.bind=function(){
    var _this=this;
    this.preBtn.on("click",function(e){
    e.preventDefault();
	  _this.playPre(1)
})
    this.nextBtn.on("click",function(e){
      console.log('23332');
     e.preventDefault(); 
	  _this.playNext(1)
})

     _this.bullets.on("click",function(e){
      console.log('22222');
      e.preventDefault();  
      var index = $(this).index();
      if (index >_this.pageIndex) {
        _this.playNext(index - _this.pageIndex);
      } else if (index < _this.pageIndex){
        _this.playPre(_this.pageIndex - index);
      }
      
})
     
}
  
  Carousel.prototype.playNext=function(len){
    this.len=len;
    var _this=this;
    this.imgCt.animate({
    left: "-=" + this.len*this.imgWidth
  },function(){
    _this.pageIndex +=_this.len;
    if( _this.imgCount === _this.pageIndex){
      _this.pageIndex = 0
      _this.imgCt.css({left:-_this.imgWidth})
    }
   _this.setBullet()
 
  });

  }
  
  Carousel.prototype.playPre=function(len){
    this.len=len;
    var _this=this;
     this.imgCt.animate({
    left: "+=" + this.len*this.imgWidth
  },function(){
   _this.pageIndex -=_this.len;
    if(_this.pageIndex < 0){
      _this.pageIndex = _this.imgCount-1
      _this.imgCt.css({left:-_this.imgWidth*_this.imgCount})
    }
    _this.setBullet()
   
  }); 
  }
  
  Carousel.prototype.setBullet=function(){
    this.bullets
    .removeClass("active")
    .eq(this.pageIndex)
    .addClass("active");
  }

  
   return  Carousel
   /*{//该立即执行函数返回一个对象，里面包含一个初始化的方法
            init: function($ct) {
              new Carousel()
              $ct.each(function(index, node) {
                var obj = new Carousel($(node));
                obj.playAlways();
              });
            }
          };*/
  })
  