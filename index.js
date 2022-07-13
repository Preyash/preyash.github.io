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