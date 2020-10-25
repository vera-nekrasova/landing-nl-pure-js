
function headerTop(header) {
	let winTop = window.scrollY;
	
	if (winTop > 30) {
		header.classList.add('sticky-header');
	} else {
		header.classList.remove('sticky-header');
	}
}

export { headerTop }