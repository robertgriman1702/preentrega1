document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.main-content .slider-container');
    const track = document.querySelector('.main-content .slider-track');
    const slides = document.querySelectorAll('.main-content .slide');
    const prevBtn = document.querySelector('.main-content .prev-slide');
    const nextBtn = document.querySelector('.main-content .next-slide');
    const dotsContainer = document.querySelector('.main-content .slider-dots');

    if (!sliderContainer || !track || !slides.length || !prevBtn || !nextBtn || !dotsContainer) {
        console.warn("Main slider elements not found or slider has no slides. Slider functionality disabled.");
        if(prevBtn) prevBtn.style.display = 'none';
        if(nextBtn) nextBtn.style.display = 'none';
        if(dotsContainer) dotsContainer.style.display = 'none';
        return;
    }

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        const percentage = -(currentIndex * 100);
        track.style.transform = `translateX(${percentage}%)`;
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        if (dots.length !== totalSlides) {
            createDots();
        }
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
         if (index < 0 || index >= totalSlides) {
            console.warn("Invalid slide index requested:", index);
            return;
        }
        currentIndex = index;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
            dot.setAttribute('type', 'button');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    createDots();
    updateSlider();
});