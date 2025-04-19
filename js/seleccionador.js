document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal-seleccionador');
    const openModalButton = document.getElementById('seleccionar');
    const closeModalButton = document.querySelector('.close-modal-seleccionador');
    const carousel = document.querySelector('.modal-seleccionador .carousel');
    const carouselItems = document.querySelectorAll('.modal-seleccionador .carousel-item');
    const prevBtn = document.querySelector('.modal-seleccionador .prev-btn');
    const nextBtn = document.querySelector('.modal-seleccionador .next-btn');
    const dotsContainer = document.querySelector('.modal-seleccionador .carousel-dots');
    const mensajeSesionModal = document.getElementById('mensaje-sesion');
    const closeMensajeSesionButton = document.querySelector('.close-mensaje-sesion');
    const guardarPeli = document.getElementById('guardar-pelicula')

    let currentIndex = 0;
    const totalItems = carouselItems.length;

    const showLoginMessageModal = () => {
        mensajeSesionModal.classList.add('active');
    }

    if (openModalButton) {
        openModalButton.addEventListener('click', () => {
            if (localStorage.getItem('isLoggedIn') !== 'true') {
                showLoginMessageModal();
                return;
            }
            if (totalItems > 0) {
                modal.classList.add('active');
                currentIndex = 0;
                updateCarousel();
            } else {
                console.warn("Selector carousel has no items.");
            }
        });
    } else {
        console.error("Button with id 'seleccionar' not found.");
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (closeMensajeSesionButton) {
        closeMensajeSesionButton.addEventListener('click', () => {
            mensajeSesionModal.classList.remove('active');
        });
    }

    if (mensajeSesionModal) {
        mensajeSesionModal.addEventListener('click', (e) => {
             if (e.target === mensajeSesionModal) {
                 mensajeSesionModal.classList.remove('active');
             }
        });
    }

    if (modal) {
         modal.addEventListener('click', (e) => {
             if (e.target === modal) {
                 modal.classList.remove('active');
             }
         });
     }

    function updateCarousel() {
        if (!carousel || totalItems === 0) return;
        const percentage = -(currentIndex * 100);
        carousel.style.transform = `translateX(${percentage}%)`;
        updateDots();
    }

    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.dot');
        if (dots.length !== totalItems) {
            createDots();
        }
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        if (index < 0 || index >= totalItems) {
            console.warn("Invalid slide index requested:", index);
            return;
        }
        currentIndex = index;
        updateCarousel();
    }

    function prevSlide() {
        if (totalItems === 0) return;
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
        updateCarousel();
    }

    function nextSlide() {
        if (totalItems === 0) return;
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    const createDots = () =>{
        if (!dotsContainer || totalItems === 0) return;
        dotsContainer.innerHTML = '';

        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir a película ${i + 1}`);
            dot.setAttribute('type', 'button');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    if (totalItems > 0) {
        createDots();
        updateCarousel();
    } else {
        if(prevBtn) prevBtn.style.display = 'none';
        if(nextBtn) nextBtn.style.display = 'none';
        if(dotsContainer) dotsContainer.style.display = 'none';
        console.warn("Selector modal carousel initialized with no items.");
    }
    class movie{
        constructor(id, title, image) {
            this.id = id;
            this.title = title;
            this.image = image;
        }
    }
    guardarPeli.addEventListener('click', () => {
        const id = crypto.randomUUID();
        const selectedMovie = carouselItems[currentIndex].querySelector('h3').textContent;
        const selectedmovieImage = carouselItems[currentIndex].querySelector('img').src;
        const selectedMovieObj = new movie(id, selectedMovie, selectedmovieImage);
        console.log(selectedMovieObj);

        const movies = JSON.parse(localStorage.getItem('movies') || '[]');
        movies.push(selectedMovieObj);
        localStorage.setItem('movies', JSON.stringify(movies));
        modal.classList.remove('active');
        setTimeout(() => {
            window.location.href = 'tickets.html';
        }, 1000);
    });
});