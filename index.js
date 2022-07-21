const links = Array.from(document.querySelectorAll('.links'))
links.map((i) =>
	i.addEventListener("click", function () {
		[].forEach.call(document.querySelectorAll(".active"), (i) => {
			i.classList.remove('active');
			console.log(i)
			i.children[0].src = i.children[0]?.src?.replace('_filled', '');
		});
		i.className += " active";
		i.children[0].src = i.children[0].src.split('.png')[0] + '_filled.png';
	})
)

window.onload = () => {
	Array.from(document.querySelectorAll('.slider2 .slick-list img')).map(i => i.classList.add('img-fluid'))
}


$(document).ready(function () {
	$('.owl-carousel').owlCarousel({
		loop: true,
		nav: true,
		margin: 10,
		responsiveClass: true,
		navText: ["<img class='slick-prev' src='./img/left.png' />", "<img class='slick-next' src='./img/left.png'/>"],
		responsive: {
			0: {
				items: 1,
				nav: true,
			},
			600: {
				items: 1,
				nav: true,
			},
			1000: {
				items: 1,
			}
		}
	})
});

document.querySelector('.more-button').addEventListener('click', function () {
	document.querySelector('.list-container').classList.toggle('menu-active');
});

// setInterval(function () {
// 	const show = document.querySelector('span[data-show]')
// 	const next = show.nextElementSibling || document.querySelector('span:first-child')
// 	const up = document.querySelector('span[data-up]')
// 	if (up) {
// 		up.removeAttribute('data-up')
// 	}
// 	show.removeAttribute('data-show')
// 	show.setAttribute('data-up', '')
// 	next.setAttribute('data-show', '')
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
