class Slider {
	constructor(param) {
		this.slider = document.querySelector(param.selector);
		this.btnPrev = this.slider.querySelector('.prev');
		this.btnNext = this.slider.querySelector('.next');
		this.slides = this.slider.querySelectorAll(param.slides);
		this.duration = param.duration || 600;
		this.dots = param.dots || false;
		this.i = 0;
		this.animated = false;

		this.leftAnim = [
			{ transform: 'translateX(-100%)', opacity: 0 }, 
			{ transform: 'translateX(0)', opacity: 1 }
		];

		this.rightAnim = [
			{ transform: 'translateX(100%)', opacity: 0 }, 
			{ transform: 'translateX(0)', opacity: 1 }
		];

		this.startX = 0;
		this.startY = 0;
		this.dist = 0;
		this.threshold = 150;
		this.allowedTime = 200;
		this.elapsedTime = 0;
		this.startTime = 0;

		this.offsetTop = this.slider.offsetTop;
		this.offsetHeight = this.slider.offsetHeight;
		this.windowTop = window.scrollY;
		this.scrollTimeoutFn;

		this.setHeight();

		if (this.dots) {
			this.dots = this.drowDots();
			this.dots[0].classList.add('dot-active');
		}

		this.btnEvent();
		this.dotEvent();
		this.touchEvent();
		this.keyboardEvent();
		this.slider.addEventListener('focus', (e) => {
			this.slider.style.outline = 'none';
		});
	}

	btnEvent() {
		this.btnNext.addEventListener('click', () => this.next());
		this.btnPrev.addEventListener('click', () => this.prev());
		this.btnNext.addEventListener('touchstart', () => this.next());
		this.btnPrev.addEventListener('touchstart', () => this.prev());
	}

	dotEvent() {
		this.dots.forEach(el => {
			el.addEventListener('click', () => this.activeSlideByDot(el));
		})
	}

	touchEvent() {
		this.slider.addEventListener('touchstart', (e) => {
			this.countTouchStart(e);
		});
		this.slider.addEventListener('touchmove', function (e) {
			e.preventDefault();
		});
		this.slider.addEventListener('touchend', (e) => {
			this.countTouchEnd(e);
		});
	}
	
	next() {
		if (!this.animated) {
			this.animated = true;
			let currentSlider = this.slides[this.i];
			let currentNum = this.i;
			this.i = (this.i < this.slides.length - 1) ? this.i + 1 : 0;
			this.toggleAnimate(currentSlider, this.slides[this.i], false);
			if (this.dots) {
				this.toggleDots(currentNum, this.i);
			}
		}
	}

	prev() {
		if (!this.animated) {
		this.animated = true;
			let currentSlider = this.slides[this.i];
			let currentNum = this.i;
			this.i = (this.i > 0) ? this.i - 1 : this.slides.length - 1;
			this.toggleAnimate(currentSlider, this.slides[this.i], true);
			if (this.dots) {
				this.toggleDots(currentNum, this.i);
			}
		}
	}

	toggleAnimate(hideClass, showClass, isReverse) {
		if ('animate' in hideClass) {			
			hideClass.animate(isReverse ? this.rightAnim : this.leftAnim, {
				duration: this.duration,
				direction: 'reverse'
			});

			showClass.animate(isReverse ? this.leftAnim : this.rightAnim, {
				duration: this.duration
			});

			this.setHeight();
			hideClass.classList.remove('slider-active');

			showClass.classList.add('slider-active');
			this.animated = false;
		} else {
			this.animated = false;
			this.setHeight();
			hideClass.classList.remove('slider-active');
			showClass.classList.add('slider-active');
		}
	}

	setHeight() {
		let slideHeight = this.slides[this.i].clientHeight;
		this.slider.style.minHeight = slideHeight + 'px';
	}

	drowDots() {
		if (this.dots) {
			let div = document.createElement('div');
			div.className = 'slider-stars_dots';
			this.slider.after(div);
			this.divDots = div;

			for (let i = 0; i < this.slides.length; i++) {
				let dot = document.createElement('span');
				dot.className = 'slider-stars_dots__item';
				div.append(dot);
			}

			let dots = div.querySelectorAll('.slider-stars_dots__item');

			this.arrayDots = Array.from(dots)

			return dots;
		}
	}

	toggleDots(lastNum, currentNum) {
		this.dots[lastNum].classList.remove('dot-active');
		this.dots[currentNum].classList.add('dot-active');
	}

	activeSlideByDot(dot) {
		let activeDot = this.divDots.querySelector('.dot-active');
		let lastNum = this.arrayDots.indexOf(activeDot);
		let curNum = this.arrayDots.indexOf(dot);
		this.i = curNum;
		this.toggleDots(lastNum, curNum);
		this.toggleAnimate(this.slides[lastNum], this.slides[curNum], false);
	}

	countTouchStart(e) {
		let touchobj = e.changedTouches[0];
		this.dist = 0;
		this.startX = touchobj.pageX;
		this.startY = touchobj.pageY;
		this.startTime = new Date().getTime();
		e.preventDefault();
	}

	countTouchEnd(e) {
		var touchobj = e.changedTouches[0];
		this.elapsedTime = new Date().getTime() - this.startTime;
		if (touchobj.pageX > this.startX) {
			this.dist = touchobj.pageX - this.startX;
			let swipe = (this.elapsedTime <= this.allowedTime && this.dist >= this.threshold && Math.abs(touchobj.pageY - this.startY) <= 100);
			if (swipe) this.handleswipe('right');
		}
		if (touchobj.pageX < this.startX) {
			this.dist = this.startX - touchobj.pageX;
			let swipe = (this.elapsedTime <= this.allowedTime && this.dist >= this.threshold && Math.abs(touchobj.pageY - this.startY) <= 100);
			if (swipe) this.handleswipe('left');
		}
		e.preventDefault();
	}

	handleswipe(isSwipe) {
		if (isSwipe === 'right') this.prev();
		else if (isSwipe  === 'left') this.next();
	}
	
	keyboardEvent() {
		this.slider.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') return this.next();
			else if (e.key === 'ArrowLeft') return this.prev();
		});
	}
}


export { Slider }



