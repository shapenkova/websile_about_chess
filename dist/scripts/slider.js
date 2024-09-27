'use strict'

// Вторая карусель
const slider = document.querySelector('#stages-slider');
const sliderItems = Array.from(document.querySelectorAll('.stages__wrapper-slide'));
const btnNext = document.querySelector('#btnNext');
const btnPrev = document.querySelector('#btnPrev');
const paginationButtons = Array.from(document.querySelectorAll('.stages__pagination-btn'));
let currentSlidesIndex = 0;
const slidesToShow = 5;

function updateSlidesVisibility() {
    const screenWidth = window.innerWidth;

    sliderItems.forEach(function (slide, index) {
        slide.classList.toggle('active', screenWidth < 1020 ? index !== 0 : false);
        
        slide.dataset.index = index;
    });
    
    sliderItems[currentSlidesIndex].setAttribute('data-active', '');
    
    updateButtonsState();
    updatePaginationState();
}

function updateButtonsState() {
    btnPrev.disabled = currentSlidesIndex === 0 ? true : false;
    btnPrev.classList.toggle('arrow--disabled', currentSlidesIndex === 0);
}

function updatePaginationState() {
    paginationButtons.forEach((button, index) => {
        button.classList.toggle('active-btn', index === currentSlidesIndex);
    });
}

btnNext.onclick = function () {
    showNextSlide('next');
};

btnPrev.onclick = function () {
    showNextSlide('prev');
};

function showNextSlide(direction) {
    const currentSlide = slider.querySelector('[data-active]');
    const currentSlideIndex = +currentSlide.dataset.index;
    currentSlide.classList.add('active');
    currentSlide.removeAttribute('data-active');
    
    let nextSlideIndex;
    nextSlideIndex = (direction === 'next') 
    ? (currentSlideIndex + 1 >= sliderItems.length ? 0 : currentSlideIndex + 1)
    : (currentSlideIndex === 0 ? sliderItems.length - 1 : currentSlideIndex - 1);

    currentSlidesIndex = nextSlideIndex;

    const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
    nextSlide.classList.remove('active');
    nextSlide.setAttribute('data-active', '');

    updateButtonsState();
    updatePaginationState();
}

updateSlidesVisibility();
window.addEventListener('resize', updateSlidesVisibility);