var hidden = function() {
	$('.search-box').css("overflow", "hidden");
	$('.search-box').removeClass('open-search');
} 

var visible = function() {
	$('.search-box').css("overflow", "visible");
}


$('.burger').click(function() {
	$('.header').toggleClass("open");
	$(this).toggleClass('active');

});

$('.search').click(function() {
	if (!$('.search-box').hasClass('open-search')) {
	$('.search-box').addClass('open-search');
	setTimeout(visible, 400);
	} else {
		if($('.search-list').hasClass("list-open")){
		$('.search-list').removeClass('list-open').slideUp(400);
		setTimeout(hidden, 400);
		} else {
			$('.search-box').css("overflow", "hidden").removeClass('open-search');
		}
	}
});

$('.movies-toggle').click(function() {
	$('.search-list').slideToggle(400);
	$('.search-list').toggleClass("list-open");
});