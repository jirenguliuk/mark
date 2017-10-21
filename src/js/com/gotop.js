define(['jquery'],function($) {
function GoTop(){
  this.target=$('<p class="goTop">Top<p>');
  this.ct = $('.cmt');
  this.createNode();
  this.bindEvent();
}

GoTop.prototype={
  bindEvent: function(){
    this.target.on("click",function(){
      $(window).scrollTop(0)
    });
      var that = this;
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 100) {
        that.target.show();
      } else {
        that.target.hide();
      }
    });
  
  },
  createNode: function(){
    this.ct.append(this.target);
   
  }
  
}
 return GoTop

})


