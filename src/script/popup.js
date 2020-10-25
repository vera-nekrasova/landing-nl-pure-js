class Popup {
	constructor(block) {
		this.block = block;
	}

	open () {
		this.block.classList.add('active-popup');
		document.body.classList.add('lock');
	}

	close() {
		this.block.classList.remove('active-popup');
		document.body.classList.remove('lock');
	}
}

export { Popup }