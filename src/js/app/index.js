require(['jquery', 'com/carousel', 'com/gotop','com/newslist'],
	function ($, Carousel, Gotop, Newslist) {
		new Carousel($('.carousel'));
        new Gotop($('.cmt'));
        new Newslist($("#newsList"));
    })
