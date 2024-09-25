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

function updateSlidesPerPage() {
    if (window.innerWidth <= 1340) {
        slidesPerPage = 1;
    } 
    else {
        slidesPerPage = 3;
    }
    currentSlideIndex = Math.min(currentSlideIndex, totalSlides - slidesPerPage);
    showSlides(currentSlideIndex);
}

window.addEventListener('resize', updateSlidesPerPage);

// Обновление пагинации
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
updateSlidesPerPage();
showSlides(currentSlideIndex);
startAutoScroll();


document.addEventListener('scroll', function() {
    let headerLink = document.querySelector('.page-header');
    
    if (window.scrollY > 50) { 
        headerLink.classList.add('scrolled');
    } else {
        headerLink.classList.remove('scrolled');
    }
});


//Вторая карусель

const wrapper = document.querySelector('.stages__wrapper');
const sliderItems = Array.from(document.querySelectorAll('.stages__wrapper-slide'));
let currentSlidesIndex = 0;


function updateSlidesVisibility() {
    const screenWidth = window.innerWidth;
    
    sliderItems.forEach(function (slide, index) {
        if (screenWidth < 1020) {
            if (index !== 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        } else {
            slide.classList.remove('acrive');
        }
    });
}

updateSlidesVisibility();

window.addEventListener('resize', updateSlidesVisibility);

    // let currentIndex = 0;

    // function updateSlide(index) {
    //     const width = wrapper.clientWidth;
    //     wrapper.scrollTo({
    //         left: width * index,
    //         behavior: 'smooth'
    //     });
    // }

    // function nextSlide() {
    //     const children = wrapper.children;
    //     if (currentIndex < children.length - 1) {
    //         currentIndex++;
    //         updateSlide(currentIndex);
    //     }
    // }

    // function previousSlide() {
    //     if (currentIndex > 0) {
    //         currentIndex--;
    //         updateSlide(currentIndex);
    //     }
    // }