 
 define(['jquery'], function ($) {


    function Newslist($ct) {
        
        var that = this;
        this.ct = $ct;
        console.log(this.ct)
        this.init();
        this.start();
        this.ct.find(".load").on('click', function() {
            that.start();
        });

    }

    
    Newslist.prototype.init = function () {
        var _this = this;
        this.length = 10;
        this.pageIndex = 10;
        this.content = this.ct.find(".content");
        this.itemWdith = this.ct.find(".item").outerWidth(true);
        this.itemCol = parseInt(this.content.width() / this.itemWdith);
        this.itemHeightArr = [];
        for (var i = 0; i < this.itemCol; i++) {
            _this.itemHeightArr[i] = 0;
        }
        this.isDataArrive = true;
    }

    Newslist.prototype.start = function () {
        var _this = this;
        _this.getNews(function (newsList) {
            _this.isDataArrive = true;
            $.each(newsList, function (idx, news) {
                var $node = _this.createEle(news)
                $node.find('img').on("load", function () {
                    _this.content.append($node)
                    console.log($node, 'loaded...')
                    _this.waterFallPlace($node)
                })
            })
        });
        _this.isDataArrive = false;
    }
    Newslist.prototype.waterFallPlace = function ($node) {
        var _this = this,
            idx = 0,
            minsumHeight = _this.itemHeightArr[0];
        for (var i = 0; i < _this.itemHeightArr.length; i++) {
            if (_this.itemHeightArr[i] < minsumHeight) {
                idx = i;
                minsumHeight = _this.itemHeightArr[i];
            }
        }

        $node.css({
            left: _this.itemWdith * idx,
            top: minsumHeight,
            opacity: 1
        })

        _this.itemHeightArr[idx] += $node.outerHeight(true);

        _this.content.height(Math.max.apply(null, _this.itemHeightArr));

    }

    Newslist.prototype.check = function ($el) {
        var windowHeight = $(window).height(),
            scrollTop = $(window).scrollTop(),
            nodeTop = $el.offset().top,
            nodeHeight = $el.outerHeight(true);

        if (windowHeight + scrollTop > nodeTop && scrollTop < nodeTop + nodeHeight) {
            return true;
        } else {
            return false;
        }
    }

    Newslist.prototype.createEle = function (item) {
        var html = "";
        html += '<li class="item">' +
            '<a href="' + item.url + '">' +
            '<img src="' + item.img_url + '" alt="">' +
            '<h4>' + item.short_name + '</h4>' +
            '<p>' + item.short_intro + '</p>' +
            '</a></li>';
        return $(html);
    }

    Newslist.prototype.getNews = function (callback) {
        var _this = this;
        $.ajax({
                url: "https://platform.sina.com.cn/slide/album_tech",
                jsonp: "jsoncallback",
                dataType: "jsonp",
                data: {
                    app_key: 1271687855,
                    num: _this.length,
                    page: _this.pageIndex
                }
            })
            .done(function (res) {
                if (res && res.status && res.status.code === "0") {
                    callback(res.data);
                    _this.pageIndex++;
                } else {
                    console.log("get error data");
                }
            })
            .fail(function () {
                console.log("系统错误");
            })
    }
    return Newslist;
})
/*    var heightArr = [];//数组初始化标志
    var heightArrInitialized = 0;
function Exposure($target, callback) {
    this.$target = $target;
    this.$target.css({'height': '20px'})

    this.callback = callback;
    this.bind();
  }
  Exposure.prototype.isVisible = function ($node) {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var nodeOffsetTop = $node.offset().top;
    if(nodeOffsetTop < scrollTop + windowHeight && nodeOffsetTop + $node.height() > scrollTop) {
      return true;
    }
      return false;
  };
  Exposure.prototype.check = function() {
    if(this.isVisible(this.$target)) {
      this.callback(this.$target);
    }
  };
  Exposure.prototype.bind = function() {
    var _this = this;
    $(window).on('scroll', function() {
      _this.check();
    })
  };
  function waterfall($imgs) {
    var imgWidth = 210;
    var windowWidth = $(window).width()
    console.log(windowWidth);
    var heightArrLength = parseInt(windowWidth / imgWidth);
    console.log(heightArrLength);
    //初始化高度数组
    if(!heightArrInitialized) {
      for(let i=0; i<heightArrLength; i++) {
        heightArr[i] = 0;
      }
      heightArrInitialized = 1;
    }

    console.log(heightArr);
    //开始布局
    $.each($imgs, function(idx, eachImg) {
      eachImg.onload = function() {
        var minHeightValue = Math.min.apply(null, heightArr);
        var minHeightIndex = heightArr.indexOf(minHeightValue);
        $(eachImg).css({
          position:'absolute',
          display: 'block',
          top: minHeightValue,
          left: minHeightIndex * imgWidth,
          marginLeft: 10
        });
        $(eachImg).addClass('isWaterfalled');
        heightArr[minHeightIndex] += $(eachImg).outerHeight(true);
        //通过显式将img-wrap高度设置为高度数组最大的值，来
        //解决绝对定位父元素塌陷问题，否则曝光元素无法正常起作用
        $imgs.parent().height(heightArr[minHeightIndex]);
     }
    })
      console.log(heightArr); 
  }
    return {
      init: function($targets, callback) {
        $targets.each(function(index, target){
          new Exposure($(target), callback);
        })
      },
   
        callback: function($node) {
        var html = '';
        $.get('/').done(function(responseData) {
          if(responseData.status===1) {
            for(let i=0; i<responseData.urls.length; i++) {
              html += '<img src="' + responseData.urls[i] + '" class="img-item">';
            }
            var $imgWrap = $node.siblings('div.img-wrap')
            $imgWrap.append(html);
            var $imgsToBeLayout = $imgWrap.children('.img-item:not(isWaterfalled)');
            waterfall($imgsToBeLayout);
          } else {
            alert('获取内容失败');
          }
        }).fail(function() {
          alert('系统异常');
        })
      }
    };
    

})*/
