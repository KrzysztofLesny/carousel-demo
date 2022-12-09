document.addEventListener('DOMContentLoaded', () => {

    const centeredSlides = document.querySelectorAll(`.slider-centered-slide`);
    const centeredSlidesWrapper = document.querySelector(`.slider-centered-wrapper`);
    const directionBtns = document.querySelectorAll(`[data-direction]`);
    let translateDistance = 6;
    let traveledDistance = 0;
    let activeSlide;
    
    let isDown = false;
    let pointerStartingPosition;
    
    const getTranslateDistance = () => {
        translateDistance += centeredSlides[0].offsetWidth;
    }
    getTranslateDistance();
    const sleep = (milliseconds) => {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    const getSlidesArray = () => {
        return [...document.querySelectorAll(`.slider-centered-slide`)];
    }
    const toggleSlideActiveClass = (slide) => {
        let slidesArray = getSlidesArray();
        let slideIndex = slidesArray.indexOf(slide);
        slidesArray.forEach((slide, i) => i === slideIndex ? slide.classList.toggle('active', true) : slide.classList.toggle('active', false));
    }
    const addNewSideSlides = (direction) => {
        let slidesArray = getSlidesArray();
        let newSlide;
        if (direction === 'next') {
            newSlide = slidesArray[2].cloneNode(true);
            centeredSlidesWrapper.appendChild(newSlide);
            centeredSlidesWrapper.removeChild(centeredSlidesWrapper.firstElementChild);
        } else {
            newSlide = slidesArray[10].cloneNode(true);
            centeredSlidesWrapper.insertBefore(newSlide, centeredSlidesWrapper.children[0]);
            centeredSlidesWrapper.removeChild(centeredSlidesWrapper.lastElementChild);
        }
        traveledDistance = 0;
        centeredSlidesWrapper.style.setProperty('--translateDistance', `${traveledDistance}px`);
        const timeout = setTimeout(() => {
            //centeredSlidesWrapper.style.setProperty('--translateDistance', `${traveledDistance}px`);
        }, 500);
    }
    const handleSlideChange = (direction) => {
        let newActiveSlide
        if (direction === 'next') {
            newActiveSlide = activeSlide.nextElementSibling;
            traveledDistance -= translateDistance;
        } else {
            newActiveSlide = activeSlide.previousElementSibling
            traveledDistance += translateDistance
        }
        toggleSlideActiveClass(newActiveSlide)
        centeredSlidesWrapper.style.setProperty('--translateDistance', `${traveledDistance}px`);
        activeSlide = newActiveSlide;
        addNewSideSlides(direction);
    }
    // INIT
    const init = () => {
        let slidesArray = getSlidesArray();
        let leftNewSlide = slidesArray[10].cloneNode(true);
        let rightNewSlide = slidesArray[0].cloneNode(true);
        centeredSlidesWrapper.appendChild(rightNewSlide);
        centeredSlidesWrapper.insertBefore(leftNewSlide, centeredSlidesWrapper.children[0]);
        activeSlide = getSlidesArray()[6];
    }
    init();
    
    // LISTENERS
    directionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => handleSlideChange(e.target.dataset.direction))
    })
    centeredSlidesWrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('slider-centered-slide')) {
            let direction;
            //toggleSlideActiveClass(e.target);
            let slidesArray = getSlidesArray();
            let clickedslideIndex = slidesArray.indexOf(e.target);
            (clickedslideIndex - 6) > 0 ? direction="next" : direction="prev"
            let counter = Math.abs(clickedslideIndex - 6);
            while (counter > 0) {
                handleSlideChange(direction);
                counter--;
            }  
            activeSlide = e.target;
        }
    })






})