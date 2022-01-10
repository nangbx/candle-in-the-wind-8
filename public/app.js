$(document).ready(function () {
  $(".image-slider").slick({
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    dots: true,
    prevArrow:
      "<button type='button' class='custom slick-prev pull-left'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='custom slick-next pull-right'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
  });
  $('.products-top').slick({
    slidesToShow: 1,
    infinite: true,
    centerMode: true,
    centerPadding: '50%',
    variableWidth: true,
    dots: true,
    prevArrow:"<button type='button' class='custom slick-prev pull-left'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    nextArrow:"<button type='button' class='custom slick-next pull-right'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
    
});
});
