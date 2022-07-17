const links = Array.from(document.querySelectorAll('.links'))

links.map((i, j) =>
	i.addEventListener("click", function () {
		[].forEach.call(document.querySelectorAll(".active"), (i) => {
			i.classList.remove('active');
			i.children[0].src = i.children[0].src.replace('_filled', '');
		});
		i.className += " active";
		i.children[0].src = i.children[0].src.split('.png')[0] + '_filled.png';
	})
)

let slidesToShow = $('.slider') ? 2 : 1
$(document).ready(function () {
	$('.slider').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		prevArrow: "<img class='slick-prev slick-arrow' src='./img/left.png' />",
		nextArrow: "<img class='slick-next slick-arrow' src='./img/left.png' />",
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	$('.slider2').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: "<img class='slick-prev slick-arrow' src='./img/left.png' />",
		nextArrow: "<img class='slick-next slick-arrow' src='./img/left.png' />",
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
});


// setInterval(function () {
//   const show = document.querySelector('span[data-show]')
//   const next = show.nextElementSibling || document.querySelector('span:first-child')
//   const up = document.querySelector('span[data-up]')
//   if (up) {
//     up.removeAttribute('data-up')
//   }
//   show.removeAttribute('data-show')
//   show.setAttribute('data-up', '')
//   next.setAttribute('data-show', '')
// }, 2000)



$(document).ready(function () {
	var progressPath = document.querySelector('.progress-wrap path');
	var pathLength = progressPath.getTotalLength();
	progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
	progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
	progressPath.style.strokeDashoffset = pathLength;
	progressPath.getBoundingClientRect();
	progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
	var updateProgress = function () {
		var scroll = $(window).scrollTop();
		var height = $(document).height() - $(window).height();
		var progress = pathLength - (scroll * pathLength / height);
		progressPath.style.strokeDashoffset = progress;
	}
	updateProgress();
	$(window).scroll(updateProgress);
	var offset = 50;
	var duration = 550;
	jQuery(window).on('scroll', function () {
		if (jQuery(this).scrollTop() > offset) {
			jQuery('.progress-wrap').addClass('active-progress');
		} else {
			jQuery('.progress-wrap').removeClass('active-progress');
		}
	});
	jQuery('.progress-wrap').on('click', function (event) {
		event.preventDefault();
		jQuery('html, body').animate({ scrollTop: 0 }, duration);
		return false;
	})
});
