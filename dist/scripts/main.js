'use strict'

//Слайдер циклический
const carousel = document.getElementById('js-carousel');
const slides = Array.from(document.querySelectorAll('.article-card'));
const prevButton = document.querySelector('.carousel__arrow-prev');
const nextButton = document.querySelector('.carousel__arrow-next');
const totalSlides = slides.length;
const pagination = document.getElementById('pagination');
const currentSlideElement = pagination.querySelector('.current-slide');
const totalSlidesElement = pagination.querySelector('.total-slides');

let currentSlideIndex = 0;
let slidesPerPage = 3;
let autoScrollInterval;

totalSlidesElement.textContent = totalSlides;

function updateSlidesPerPage() {
    slidesPerPage = (window.innerWidth <= 1340) ? 1 : 3;
    currentSlideIndex = Math.min(currentSlideIndex, totalSlides - slidesPerPage);
    showSlides(currentSlideIndex);
}

window.addEventListener('resize', updateSlidesPerPage);


function updatePagination() {
    currentSlideElement.textContent =  currentSlideIndex + slidesPerPage;
}
function showSlides(startIndex) {
    slides.forEach((slide, index) => {
        slide.classList.add('hidden');
        if (index >= startIndex && index < startIndex + slidesPerPage) {
            slide.classList.remove('hidden');
        }
    });
    updatePagination();
}

nextButton.addEventListener('click', () => {
    moveToNextSlide();
});

prevButton.addEventListener('click', () => {
    moveToPrevSlide();
});

function moveToNextSlide() {
    currentSlideIndex = (currentSlideIndex + slidesPerPage < totalSlides) 
        ? currentSlideIndex + slidesPerPage 
        : 0;
    showSlides(currentSlideIndex);
}

function moveToPrevSlide() {
    currentSlideIndex = (currentSlideIndex - slidesPerPage >= 0) 
        ? currentSlideIndex - slidesPerPage 
        : totalSlides - slidesPerPage;
    showSlides(currentSlideIndex);
}

// Автоматическое переключение слайдов каждые 4 секунды
function startAutoScroll() {
    autoScrollInterval = setInterval(moveToNextSlide, 4000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

carousel.addEventListener('mouseenter', stopAutoScroll);
carousel.addEventListener('mouseleave', startAutoScroll);

updateSlidesPerPage();
showSlides(currentSlideIndex);
startAutoScroll();

//Шапка сайта при скролле
document.addEventListener('scroll', function() {
    let headerLink = document.querySelector('.page-header');
    window.scrollY > 50 
        ? headerLink.classList.add('scrolled') 
        : headerLink.classList.remove('scrolled');
});