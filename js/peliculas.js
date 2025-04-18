document.addEventListener('DOMContentLoaded', ()=> {
    const slider = document.querySelector('.slider');
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideInterval = 5000;

    const createDots = () => {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    const updateSlider = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        document.querySelectorAll('.slider-dots .dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    const goToSlide = (index) =>{
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }

    const prevSlide =() => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlider();
        resetAutoSlide();
    }
    
    const nextSlide = () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
        resetAutoSlide();
    }
    
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    }
    
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    createDots();
    startAutoSlide();
    
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
});