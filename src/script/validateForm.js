let patterns = {
	name: /^[аА-яЯ ]{2,20}$/,
	tel: /^\+?[0-9]{7,15}$/
};

function validateForm(inputs) {
	let hasError = false;
	for (let i = 0; i < inputs.length; i++) {
		let name = inputs[i].name;
		let pattern = patterns[name];
		let value = inputs[i].value.trim();

		if(!pattern.test(value)){
			inputs[i].classList.add('err');
			hasError = true;
			return hasError;
		}
	}

	return hasError;
}

export { validateForm }
