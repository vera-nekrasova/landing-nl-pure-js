function changeBgSlider (arrBg, classActive) {
	for (let i = 0; i < arrBg.length; i++) {
		if (arrBg[i].classList.contains(classActive)) {
			if (i == (arrBg.length - 1)) {
				return updateTransition(arrBg[i], arrBg[0], classActive);
			}
			return updateTransition(arrBg[i], arrBg[i + 1], classActive);
		};
	}
}
	
function updateTransition(act, disact, classActive) {
	act.classList.remove(classActive);
	disact.classList.add(classActive);
}

export { changeBgSlider }