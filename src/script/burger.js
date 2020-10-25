	function showBurger(burger, nav, classAct) {
		burger.classList.toggle(classAct);
		nav.classList.toggle(classAct);
		document.body.classList.toggle('lock');
	}

	function hideBurger(burger, nav, classAct) {
		burger.classList.remove(classAct);
		nav.classList.remove(classAct);
		document.body.classList.remove('lock');
	}

	export {showBurger, hideBurger}
