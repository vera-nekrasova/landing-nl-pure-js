function smoothNavigation(blockShow) {
	let blockID = blockShow.getAttribute('href');

	document.querySelector(blockID).scrollIntoView({
		behavior: 'smooth',
	})
}

export { smoothNavigation }
