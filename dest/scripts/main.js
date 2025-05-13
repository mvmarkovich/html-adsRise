//
// Header and mobile menu
//

let header = document.querySelector('.header'),
    headerBurger = document.querySelector('.header__burger'),
    headerOverlay = document.querySelector('.header__overlay');

function stickyHeader() {
    if (window.scrollY > 0) {
        header.classList.add("header--sticky");
    } else {
        header.classList.remove("header--sticky");
    }
}

function toggleMobileMenu() {
    header.classList.toggle('header-mobile-menu');
    headerOverlay.classList.toggle('header__overlay--show');
    document.body.classList.toggle('overflow-hidden');
}

window.addEventListener("load", stickyHeader);
window.addEventListener("scroll", stickyHeader);
headerBurger.addEventListener("click", toggleMobileMenu);
headerOverlay.addEventListener("click", toggleMobileMenu);

//
// Anchors
//

document.querySelectorAll('a[href^="#"').forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault();

		if (window.innerWidth <= 1024) toggleMobileMenu();

		let href = this.getAttribute('href').substring(1);

		const scrollTarget = document.getElementById(href);

		const topOffset = document.querySelector('.header').offsetHeight;
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		});
	});
});

//
// Scroll Top
//

function scrollTop(logo) {
	if (!logo) return;

	logo.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}

scrollTop(document.querySelector('.header__logo'));

//
// Sources tabs
//

const tabs = () => {
	const head = document.querySelector('.sources__nav');
	const body = document.querySelector('.sources__content');

	head.querySelector('.sources__nav-item').classList.add('tabs__nav-item--active');

	const getActiveTabName = () => {
		return head.querySelector('.sources__nav-item--active').dataset.tab;
	}

	const setActiveContent = () => {
		if (body.querySelector('.sources__section--show')) {
			body.querySelector('.sources__section--show').classList.remove('sources__section--show');
		}

		body.querySelector(`[data-tab=${getActiveTabName()}]`).classList.add('sources__section--show');
	}

	if (!head.querySelector('.sources__nav-item--active')) {
		head.querySelector('.sources__nav-item').classList.add('sources__nav-item--active');
	}

	setActiveContent(getActiveTabName());

	head.addEventListener('click', e => {
		const caption = e.target.closest('.sources__nav-item');

		if (!caption) return;
		if (caption.classList.contains('.sources__nav-item--active')) return;

		if (head.querySelector('.sources__nav-item--active')) {
			head.querySelector('.sources__nav-item--active').classList.remove('sources__nav-item--active');
		}

		caption.classList.add('sources__nav-item--active');

		setActiveContent(getActiveTabName());
	})
}

tabs();