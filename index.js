document.addEventListener('DOMContentLoaded', () => {

    const root = document.documentElement;
    const centeredSlides = document.querySelectorAll(`.slider-centered-slide`);
    const centeredSlidesWrapper = document.querySelector(`.slider-centered-wrapper`);
    const directionBtns = document.querySelectorAll(`[data-direction]`);
    let translateDistance;
    let traveledDistance = 0;
    let activeSlide;

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
        } else {
            newSlide = slidesArray[10].cloneNode(true);
            centeredSlidesWrapper.insertBefore(newSlide, centeredSlidesWrapper.children[0]);
        }
    }
    const removeExcessSlide = (direction) => {
        if (direction === 'next') {
            centeredSlidesWrapper.removeChild(centeredSlidesWrapper.firstElementChild);
        } else {
            centeredSlidesWrapper.removeChild(centeredSlidesWrapper.lastElementChild);
        }
    }
    const handleSlideChange = (direction) => {
        let newActiveSlide
        if (direction === 'next') {
            newActiveSlide = activeSlide.nextElementSibling;
            traveledDistance -= translateDistance;
            root.style.setProperty('--transformOrigin', `right`);
        } else {
            newActiveSlide = activeSlide.previousElementSibling
            traveledDistance += translateDistance
            root.style.setProperty('--transformOrigin', `left`);
        }
        root.style.setProperty('--translateDistance', `${traveledDistance}px`);
        addNewSideSlides(direction);
        toggleSlideActiveClass(newActiveSlide);
        traveledDistance = 0;
        const removeExcessSlideDelay = setTimeout(() => {
            root.style.setProperty('--translateDistance', `${traveledDistance}px`);
        }, 250);
        removeExcessSlide(direction);
        traveledDistance = 0;
        //root.style.setProperty('--translateDistance', `${traveledDistance}px`);
        activeSlide = newActiveSlide;
    }
    // INIT
    const init = () => {
        let wrapperWidth = centeredSlidesWrapper.offsetWidth
        root.style.setProperty('--slidesGap', `${wrapperWidth*0.005}px`);
        root.style.setProperty('--slideWidth', `${wrapperWidth*0.045}px`);
        root.style.setProperty('--slideMinWidth', `${wrapperWidth*0.045}px`);
        root.style.setProperty('--activeSlideWidth', `${wrapperWidth*0.5}px`);
        root.style.setProperty('--activeSlideMinWidth', `${wrapperWidth*0.5}px`);
        translateDistance = (wrapperWidth*0.045) + (wrapperWidth*0.005);
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
    let startPosition;
    let positionChange;
    let isPointerDown = false;
    centeredSlidesWrapper.addEventListener('pointerdown', (e) => {
        isPointerDown = true;
        startPosition = e.clientX;
    });
    centeredSlidesWrapper.addEventListener('pointermove', (e) => {
        e.preventDefault();
        if (isPointerDown) {
            let touchPosition = e.clientX;
            positionChange = startPosition - touchPosition;
        }
    });
    centeredSlidesWrapper.addEventListener('pointerup', (e) => {
        if (e.target.classList.contains('slider-centered-slide')) {
            if (e.target.classList.contains('active')) {
                if (positionChange > 0) handleSlideChange('next');
                if (positionChange < 0) handleSlideChange('prev');
            } else {
                let direction;
                let slidesArray = getSlidesArray();
                let clickedslideIndex = slidesArray.indexOf(e.target);
                (clickedslideIndex - 6) > 0 ? direction="next" : direction="prev";
                let counter = Math.abs(clickedslideIndex - 6);
                while (counter > 0) {
                    handleSlideChange(direction);
                    counter--;
                }  
            } 
        }
        isPointerDown = false;
    });
})