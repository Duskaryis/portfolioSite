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
const searchBox = document.querySelector('#search');
const portfolioWrapper = document.getElementById('portfolio-wrapper');

/* Modal */
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

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

// Full Site Modal "open buttons"
for (const elm of openModal) {
	elm.addEventListener('click', function () {
		const modalId = this.dataset.open;
		document.getElementById(modalId).classList.add(isVisible);
	});
}

for (const elm of closeModal) {
	elm.addEventListener('click', function () {
		this.parentElement.parentElement.classList.remove(isVisible);
	});
}

// Portfolio Card Container

const portfolioCardData = [
	{
		image: '../assets/week 8 image assets/images/portfolio-1.jpg',
		category: 'Web Development',
		title: 'Food Website',
		id: 'web',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-2.jpg',
		category: 'App Development',
		title: 'Shopping Website',
		id: 'app',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-3.jpg',
		category: 'UI Design',
		title: 'Portfolio Website',
		id: 'ui',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-4.jpg',
		category: 'App Development',
		title: 'Food Website',
		id: 'app',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-5.jpg',
		category: 'Web Development',
		title: 'Food Website',
		id: 'web',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-6.jpg',
		category: 'Web Development',
		title: 'Food Website',
		id: 'web',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-7.jpg',
		category: 'UI Design',
		title: 'Food Website',
		id: 'web',
	},
	{
		image: '../assets/week 8 image assets/images/portfolio-8.jpg',
		category: 'Web Development',
		title: 'Food Website',
		id: 'web',
	},
];

// Input : Data -> An object ( 1 of them )
// Output: Portfolio Card

function createPortfolioCard(cardData) {
	const card = document.createElement('div');
	card.classList = 'portfolio-card';
	card.id = cardData.id;

	const cardBody = document.createElement('div');
	cardBody.classList = 'card-body';

	const cardImg = document.createElement('img');
	cardImg.src = cardData.image;
	cardImg.alt = cardData.title;

	const cardA = document.createElement('a');
	cardA.classList = 'card-popup-box';

	const cardCategory = document.createElement('div');
	cardCategory.innerHTML = cardData.category;

	const cardTitle = document.createElement('h3');
	cardTitle.innerHTML = cardData.title;

	card.appendChild(cardBody);
	cardBody.appendChild(cardA);
	cardBody.appendChild(cardImg);
	cardBody.appendChild(cardCategory);
	cardBody.appendChild(cardTitle);

	portfolioWrapper.appendChild(card);
}

portfolioCardData.map((cardData) => createPortfolioCard(cardData));
