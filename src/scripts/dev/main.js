'use strict'

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

// Устанавка общего количества слайдов в элемент
totalSlidesElement.textContent = totalSlides;

// Обновление пагинации
function updatePagination() {
    currentSlideElement.textContent =  currentSlideIndex + slidesPerPage;
}
function showSlides(startIndex) {
    slides.forEach((slide, index) => {
        slide.classList.add('hidden');
        if (index >= startIndex && index < startIndex + 3) {
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
    if (currentSlideIndex + slidesPerPage < totalSlides) {
        currentSlideIndex += slidesPerPage;
    } else {
        currentSlideIndex = 0;
    }
    showSlides(currentSlideIndex);
}

function moveToPrevSlide() {
    if (currentSlideIndex - slidesPerPage >= 0) {
        currentSlideIndex -= slidesPerPage;
    } else {
        currentSlideIndex = totalSlides - slidesPerPage;
    }
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

// Инициализация показа первых трех слайдов и установки пагинации
showSlides(currentSlideIndex);
startAutoScroll();
