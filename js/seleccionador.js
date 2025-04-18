document.addEventListener('DOMContentLoaded', function() {
    const openModal = document.querySelector('#seleccionar');
    const closeModal = document.querySelector('.close-modal-seleccionador');
    const modal = document.querySelector('.modal-seleccionador');
    
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideIntervalTime = 5000; 

    const checkLog = () => {
        if (!localStorage.getItem('datosUsuario')){
            return false;
        }
        return true;
    }

    function initDots() {
        dotsContainer.innerHTML = '';
        carouselItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        document.querySelectorAll('.carousel-dots .dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }
    function prevSlide() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
        resetAutoSlide();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
        resetAutoSlide();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    openModal.addEventListener('click', function(e) {
        e.preventDefault();
        if (!checkLog()) {
            return;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        initDots();
        startAutoSlide();
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        clearInterval(autoSlideInterval);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            clearInterval(autoSlideInterval);
        }
    });
    
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', startAutoSlide);
    

    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                clearInterval(autoSlideInterval);
            }
        }
    });
});