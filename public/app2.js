function createSlick(){  
	$(".products-top").not(".slick-initialized").slick({
		slidesToShow: 2,
		infinite: true,
		variableWidth: true,
		dots: true,
		prevArrow:
			"<button type='button' class='custom slick-next pull-right'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
		nextArrow:
			"<button type='button' class='custom slick-prev pull-left'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
	});
}
createSlick();

//Now it will not throw error, even if called multiple times.
$(window).on( 'resize', createSlick );
