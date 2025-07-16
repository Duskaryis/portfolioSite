const slides = document.querySelectorAll('.review-item');
const buttons = document.querySelectorAll('.slide-ctrl-container button');

let current = Math.floor(Math.random() * slides.length);
let next;
let prev;
console.log(current);
console.log(buttons);

const dummySlides = [
	// slide 0
	// slide 1
	// slide 2
	// slide 3
];
