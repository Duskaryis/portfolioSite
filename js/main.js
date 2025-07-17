const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

const root = document.documentElement;

/*Theme*/
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Portfolio */
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);

//Empty array at portfolioItems

const searchBox = document.querySelector('#search');
const portfolioWrapper = document.getElementById('portfolio-wrapper');

const setActive = (elm, selector) => {
	if (document.querySelector(`${selector}.${active}`) !== null) {
		document.querySelector(`${selector}.${active}`).classList.remove(active);
	}
	elm.classList.add(active);
};

const setTheme = (val) => {
	if (val === 'dark') {
		root.setAttribute(dataTheme, dark);
		localStorage.setItem(theme, dark);
	} else {
		root.setAttribute(dataTheme, light);
		localStorage.setItem(theme, light);
	}
};

if (currentTheme) {
	root.setAttribute(dataTheme, currentTheme);
	switcher.forEach((btn) => {
		btn.classList.remove(active);
	});
	if (currentTheme === dark) {
		switcher[1].classList.add(active);
	} else {
		switcher[0].classList.add(active);
	}
}

toggleTheme.addEventListener('click', function () {
	const tab = this.parentElement.parentElement;
	if (!tab.className.includes(open)) {
		tab.classList.add(open);
	} else {
		tab.classList.remove(open);
	}
});

for (const elm of switcher) {
	elm.addEventListener('click', function () {
		const toggle = this.dataset.toggle;
		// set active state
		setActive(elm, switcherBtn);
		setTheme(toggle);
	});
}

searchBox.addEventListener('keyup', (e) => {
	const searchInput = e.target.value.toLowerCase().trim();
	console.log(portfolioItems);
	portfolioItems.forEach((card) => {
		if (card.dataset.item.includes(searchInput)) {
			card.style.display = 'block';
		} else {
			card.style.display = 'none';
		}
	});
});

for (const link of filterLink) {
	link.addEventListener('click', function () {
		setActive(link, '.filter-link');
		const filter = this.dataset.filter;
		portfolioItems = document.querySelectorAll(portfolioData);
		portfolioItems.forEach((card) => {
			if (filter === 'all') {
				card.style.display = 'block';
			} else if (card.dataset.item === filter) {
				card.style.display = 'block';
			} else {
				card.style.display = 'none';
			}
		});
	});
}

// Portfolio-Card Container

const portfolioCardData = [
	{
		image: '../assets/week 8 image assets/images/portfolio-1.jpg',
		category: 'Web Development',
		title: 'Food Website',
		item: 'web',
		open: 'web-1',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-2.jpg',
		category: 'App Development',
		title: 'Shopping Website',
		item: 'app',
		open: 'app-1',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-3.jpg',
		category: 'UI Design',
		title: 'Portfolio Website',
		item: 'ui',
		open: 'ui-1',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-4.jpg',
		category: 'App Development',
		title: 'Food Website',
		item: 'app',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-5.jpg',
		category: 'Web Development',
		title: 'Food Website',
		item: 'web',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-6.jpg',
		category: 'Web Development',
		title: 'Food Website',
		item: 'web',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-7.jpg',
		category: 'UI Design',
		title: 'Food Website',
		item: 'web',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-8.jpg',
		category: 'Web Development',
		title: 'Food Website',
		item: 'web',
	},
];

portfolioCardData.forEach((item) => {
	const card = document.createElement('div');
	card.className = 'portfolio-card';
	card.dataset.item = item.item;
	card.dataset.open = item.open;

	card.innerHTML = `
    	<div class="card-body">
			<img src="${item.image}" alt="${item.title}">
			<div class="card-popup-box">
				<div>${item.category}</div>
				<h3>${item.title}</h3>
			</div>
		</div>
	`;
	portfolioWrapper.appendChild(card);
});

const portfolioPopupModal = document.getElementById('popup-modal');

const popupPortfolioModalData = [
	{
		open: 'web-1',
		title: 'Web Project 1',
		image: './assets/week 8 image assets/images/portfolio-1.jpg',
		descriptionShort: 'My first awesome website',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		descriptionExtended: 'Built using HTML, CSS, and JavaScript.',
	},
	{
		open: 'app-1',
		title: 'App Project 1',
		image: './assets/week 8 image assets/images/portfolio-2.jpg',
		descriptionShort: 'Another cool project',
		description: 'Lorem ipsum dolor sit amet.',
		descriptionExtended: 'Built using HTML, CSS, and JavaScript.',
	},
	{
		open: 'ui-1',
		title: 'UI Project 1',
		image: './assets/week 8 image assets/images/portfolio-3.jpg',
		descriptionShort: 'Another cool project',
		description: 'Lorem ipsum dolor sit amet.',
		descriptionExtended: 'Built using HTML, CSS, and JavaScript.',
	},
];

popupPortfolioModalData.forEach((item) => {
	const modal = document.createElement('div');
	modal.className = 'modal';
	modal.id = item.open;
	modal.setAttribute('data-animation', 'slideInOutTop');

	modal.innerHTML = `
		<div class="modal-dialog">
			<header class="modal-header">
				<h3>${item.title}</h3>
				<i class="fas fa-times" data-close></i>
			</header>
			<div class="modal-body">
				<div class="img-wrapper">
					<img src="${item.image}" alt="${item.title}" />
				</div>
				<div class="text-wrapper">
					<p><strong>${item.descriptionShort}</strong></p>
					<p>${item.description}</p>
					<p>${item.descriptionExtended}</p>
				</div>
			</div>
		</div>
	`;

	portfolioPopupModal.appendChild(modal);
});

/* Modal */
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// Modal
document.addEventListener('click', (e) => {
	console.log(e.target, document.querySelector('.modal.is-visible'));
	if (e.target === document.querySelector('.modal.is-visible')) {
		document.querySelector('.modal.is-visible').classList.remove(isVisible);
	}
});

document.addEventListener('keyup', (e) => {
	console.log(e.key);
	if (e.key === 'Escape') {
		document.querySelector('.modal.is-visible').classList.remove(isVisible);
	}
});

// Marquee
const elmsDisplayed = getComputedStyle(root).getPropertyValue(
	'--marquee-elms-displayed'
);
const marqueeContent = document.querySelector('ul.marquee-content');
root.style.setProperty('--marquee-elms', marqueeContent.children.length);

for (let i = 0; i < elmsDisplayed; i += 1) {
	marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

// Modal/Full Site Modal "open buttons"
for (const elm of openModal) {
	elm.addEventListener('click', function () {
		const modalId = this.dataset.open;
		console.log('modal id: ', modalId);
		document.getElementById(modalId).classList.add(isVisible);
	});
}

for (const elm of closeModal) {
	elm.addEventListener('click', function () {
		this.parentElement.parentElement.parentElement.classList.remove(isVisible);
	});
}
