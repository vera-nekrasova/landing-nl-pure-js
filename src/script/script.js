import { showBurger, hideBurger } from './burger';
import { changeBgSlider } from './changeBgSlider';
import { headerTop } from './headerTop';
import { Slider } from './slider';
import { Popup } from './popup';
import { validateForm } from './validateForm';
import '@babel/polyfill';


window.addEventListener('load', function () {
	// ---------burger-menu--------------
	let burger = document.querySelector('.site-header_menu-burger');
	let nav = document.querySelector('.site-header_nav');
	let headerLink = document.querySelectorAll('.site-header_link');

	burger.addEventListener('click', () => showBurger(burger, nav, 'active'));
	burger.addEventListener('touchend', function (e) {
		e.preventDefault();
		showBurger(burger, nav, 'active');
	});

	headerLink.forEach((el) => {
		el.addEventListener('click', () => hideBurger(burger, nav, 'active'));
		el.addEventListener('touchend', function(e) {
			e.preventDefault();
			hideBurger(burger, nav, 'active');
		});
	});

	// ------------change-bg-------------
	let mainBg = document.querySelectorAll('.main_bg');
	let firstScreenBg = document.querySelectorAll('.first-screen_bg');
	let timeBgChange = 5000;

	window.setInterval(() => changeBgSlider(mainBg, 'bg-active'), timeBgChange);
	window.setInterval(() => changeBgSlider(firstScreenBg, 'bg-active'), timeBgChange);

	//-------------header top-------------
	let header = document.querySelector('.header');
	window.addEventListener('scroll', () => headerTop(header));

	// ------------smooth-nav-------------

	let arrDown = document.querySelector('.main_arr');
	let nextSection = document.querySelector('#what-is-ed');

	arrDown.addEventListener('click', function(e) {
		e.preventDefault();
		nextSection.scrollIntoView({ behavior: 'smooth' });
	});

	arrDown.addEventListener('touchend', function (e) {
		e.preventDefault();
		nextSection.scrollIntoView({ behavior: 'smooth' });
	});


	let menu = document.querySelector('.site-header_nav');
	menu.addEventListener('click', function(e) {
		smoothScrollToSection(e);
	});
	menu.addEventListener('touchend', function(e) {
		smoothScrollToSection(e);
	});

	function smoothScrollToSection(e) {
	let elem = e.target;
	if (elem.classList.contains('navLink')) {
		e.preventDefault();
		let target = document.querySelector(elem.hash);
		target.scrollIntoView(
			{
			behavior: 'smooth',
		})
	}
}

	// --------------slider-----------

	let slider1 = new Slider({
		selector: '.slider-stars_main',
		slides: '.slider-stars_review',
		duration: 500,
		dots: true
	});

	// ------ popup-------------------
	let btnForm = document.querySelector('.main_btn');
	let popup = document.querySelector('.popup');
	let popupOut = document.querySelector('.popup_window');
	let formPopup = new Popup(popup);
	let formBtn = document.querySelector('.form_btn');
	let form = document.querySelector('.form');
	let inputs = form.querySelectorAll('.form_line__input');
	let btnClose = document.querySelector('.popup_close');

// блокировка формы
	let newForm = false;

	function disableForm() {
		formBtn.value = 'Заявка принята!'
		formBtn.classList.add('btn-disabled');
	}

	function updateForm() {
		if (newForm) {
			formBtn.classList.remove('btn-disabled');
			formBtn.value = 'Хочу похудеть';
			newForm = false;
		}
	}
	
//открыть
	btnForm.addEventListener('click', function () {
		formPopup.open();
	});

	btnForm.addEventListener('touchend', function (e) {
		e.preventDefault();
		formPopup.open();
	});

//закрыть
	popupOut.addEventListener('click', function (e) {
		if (e.target.className === this.className) {
			formPopup.close();
		}
	});

	popupOut.addEventListener('touchend', function (e) {
		if (e.target.className === this.className) {
			formPopup.close();
		}
	});

	btnClose.addEventListener('click', function (e) {
		if (e.target.className === this.className) {
			formPopup.close();
		}
	});

	btnClose.addEventListener('touchend', function(e) {
		if (e.target.className === this.className) {
			formPopup.close();
		}
	});

//проверка
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		let result = validateForm(inputs);
		if (!result) {
			form.reset();
			disableForm();
			setTimeout(() => {
				formPopup.close();
				newForm = true;
				updateForm();
			}, 800);
		}
	});

	form.addEventListener('focusin', function(e) {
		if (e.target.classList.contains('form_line__input')) {
			e.target.classList.remove('err');
		}
	});

//события клавиатуры
	popup.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			formPopup.close();
		}
	})
	// ------ popup-------------------
});

