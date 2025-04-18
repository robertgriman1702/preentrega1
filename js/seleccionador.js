document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('seleccionar');
    const closeModalButton = document.querySelector('.close-modal-seleccionador');
    const modal = document.querySelector('.modal-seleccionador');
    const carousel = document.querySelector('.modal-seleccionador .carousel');
    const prevBtn = document.querySelector('.modal-seleccionador .prev-btn');
    const nextBtn = document.querySelector('.modal-seleccionador .next-btn');
    const dotsContainer = document.querySelector('.modal-seleccionador .carousel-dots');
    const mensajeSesion = document.getElementById('mensaje-sesion');
    const closeMensajeButton = document.querySelector('.close-mensaje-sesion');

    let carouselItems = []; 
    let currentIndex = 0;
    let autoSlideInterval;
    const slideIntervalTime = 5000; 

    const checkLogin = () => {
        try {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

            if (!isLoggedIn || !currentUser.usuario) {
                showLoginMessage();
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error checking login:', error);
            showLoginMessage(); 
            return false;
        }
    };

    const showLoginMessage = () => {
        if (!mensajeSesion) return;

        mensajeSesion.classList.add('active');
        document.body.style.overflow = 'hidden';

        const timeout = setTimeout(closeMessageAndShowLogin, 3000);

       
        if (closeMensajeButton) {
            const clickHandler = () => {
                clearTimeout(timeout);
                closeMessageAndShowLogin();
                closeMensajeButton.removeEventListener('click', clickHandler);
            };
           
            closeMensajeButton.removeEventListener('click', clickHandler);
            closeMensajeButton.addEventListener('click', clickHandler);
        }
    };

    const closeMessageAndShowLogin = () => {
        if (mensajeSesion) {
            mensajeSesion.classList.remove('active');
        }
        document.body.style.overflow = 'auto'; 

        const loginModal = document.querySelector('.modal'); 
        const loginForm = document.getElementById('Login-Form');
        const registerForm = document.getElementById('register-form');

        if (loginModal) loginModal.classList.add('active');
        if (loginForm) loginForm.classList.remove('hidden'); 
        if (registerForm) registerForm.classList.remove('active'); 
    };

    function updateCarouselItems() {
        if(carousel) {
            carouselItems = carousel.querySelectorAll('.carousel-item');
        } else {
            carouselItems = [];
        }
    }

    function initDots() {
        if (!dotsContainer || !carouselItems || carouselItems.length === 0) return;

        dotsContainer.innerHTML = ''; 
        carouselItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentIndex) dot.classList.add('active'); 
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function updateCarousel() {
        if (!carousel || !carouselItems || carouselItems.length === 0) return;

        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    }

    function goToSlide(index) {
        if (!carouselItems || carouselItems.length === 0) return;
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }

    function prevSlide() {
        if (!carouselItems || carouselItems.length === 0) return;
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
        resetAutoSlide();
    }

    function nextSlide() {
        if (!carouselItems || carouselItems.length === 0) return;
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
        resetAutoSlide();
    }

    function startAutoSlide() {
        if (!carouselItems || carouselItems.length <= 1) return; 
        clearInterval(autoSlideInterval); 
        autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    if (openModalButton) {
        openModalButton.addEventListener('click', (e) => {
            e.preventDefault();

            if (!checkLogin()) {
                return; 
            }

            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                updateCarouselItems();
                currentIndex = 0; 
                updateCarousel();
                initDots(); 
                startAutoSlide(); 
            }
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            stopAutoSlide();
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                stopAutoSlide();
            }
        });
    }
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    document.addEventListener('keydown', (e) => {
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'Escape') {
                if (closeModalButton) closeModalButton.click(); 
            }
        }
    });

});