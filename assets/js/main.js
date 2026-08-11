// Slider
const slider = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-track .col__blur');

let index = 0;

document.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % items.length;
    slider.style.transform = `translateX(-${index * 100}%)`;
});

document.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    slider.style.transform = `translateX(-${index * 100}%)`;
});

// Click search hidden
// const searchIcon = document.getElementById('search-icon');
// const searchBox = document.getElementById('search-box');

// searchIcon.addEventListener('click', () => {
// if (searchBox.style.display === 'none' || searchBox.style.display === '') {
//     searchBox.style.display = 'flex'
// //   searchIcon.style.display = 'none';
// } else {
//     searchBox.style.display = 'none';
// }
// });