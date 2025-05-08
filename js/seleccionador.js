document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal-seleccionador');
    const openModalButton = document.getElementById('seleccionar');
    const closeModalButton = document.querySelector('.close-modal-seleccionador');
    const carousel = document.querySelector('.modal-seleccionador .carousel');
    const prevBtn = document.querySelector('.modal-seleccionador .prev-btn');
    const nextBtn = document.querySelector('.modal-seleccionador .next-btn');
    const dotsContainer = document.querySelector('.modal-seleccionador .carousel-dots');
    const mensajeSesionModal = document.getElementById('mensaje-sesion');
    const closeMensajeSesionButton = document.querySelector('.close-mensaje-sesion');
    const guardarPeliButton = document.getElementById('guardar-pelicula');

    let currentIndex = 0;
    let totalItems = 0;
    let peliculasDisponibles = [];

    async function cargarPeliculasParaSeleccion() {
        try {
            const response = await fetch('data/peliculas.json');
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            peliculasDisponibles = await response.json();
            totalItems = peliculasDisponibles.length;

            if (totalItems > 0) {
                renderizarCarouselItems();
                if (prevBtn) prevBtn.addEventListener('click', prevSlide);
                if (nextBtn) nextBtn.addEventListener('click', nextSlide);
                if (guardarPeliButton) guardarPeliButton.addEventListener('click', guardarPeliculaSeleccionada);
                createDots();
                updateCarousel();
            } else {
                if (carousel) carousel.innerHTML = '<p>No hay películas para seleccionar.</p>';
                if(prevBtn) prevBtn.style.display = 'none';
                if(nextBtn) nextBtn.style.display = 'none';
                if(dotsContainer) dotsContainer.style.display = 'none';
                if(guardarPeliButton) guardarPeliButton.style.display = 'none';
            }
        } catch (error) {
            console.error('Error al cargar películas para el seleccionador:', error);
            if (carousel) carousel.innerHTML = '<p>Error al cargar películas. Intente más tarde.</p>';
             if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
            if(dotsContainer) dotsContainer.style.display = 'none';
            if(guardarPeliButton) guardarPeliButton.style.display = 'none';
        }
    }

    function renderizarCarouselItems() {
        if (!carousel) return;
        carousel.innerHTML = '';
        peliculasDisponibles.forEach(pelicula => {
            const li = document.createElement('li');
            li.classList.add('carousel-item');
            li.innerHTML = `
                <div class="movie-poster">
                    <img src="${pelicula.imagenUrl}" alt="Poster de ${pelicula.titulo}" class="slider-img" loading="lazy">
                </div>
                <div class="movie-info">
                    <h3>${pelicula.titulo}</h3>
                    <div class="movie-meta">
                        <span class="duration">${pelicula.duracion}</span>
                        <span class="rating">★ ${pelicula.rating}</span>
                        <span class="genre">${pelicula.genero}</span>
                    </div>
                </div>
            `;
            carousel.appendChild(li);
        });
    }

    const showLoginMessageModal = () => {
        if (mensajeSesionModal) mensajeSesionModal.classList.add('active');
    }

    if (openModalButton) {
        openModalButton.addEventListener('click', () => {
            let isLoggedIn = false;
            try {
                isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            } catch (e) {
                console.error("Error al acceder a localStorage:", e);
            }

            if (!isLoggedIn) {
                showLoginMessageModal();
                return;
            }
            if (totalItems > 0 && modal) {
                modal.classList.add('active');
                currentIndex = 0;
                updateCarousel();
            }
        });
    }

    if (closeModalButton && modal) {
        closeModalButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (closeMensajeSesionButton && mensajeSesionModal) {
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
        if (!dotsContainer || totalItems === 0) return;
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

    function createDots() {
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
    
    function guardarPeliculaSeleccionada() {
        if (currentIndex < 0 || currentIndex >= peliculasDisponibles.length) return;

        const peliculaSeleccionada = peliculasDisponibles[currentIndex];
        
        const peliculaParaGuardar = {
            id: peliculaSeleccionada.id || crypto.randomUUID(),
            title: peliculaSeleccionada.titulo,
            image: peliculaSeleccionada.imagenUrl,
            duration: peliculaSeleccionada.duracion,
            genre: peliculaSeleccionada.genero,
            rating: peliculaSeleccionada.rating
        };

        try {
            let moviesEnStorage = [];
            const moviesString = localStorage.getItem('movies');
            if (moviesString) {
                moviesEnStorage = JSON.parse(moviesString);
            }
            moviesEnStorage.push(peliculaParaGuardar);
            localStorage.setItem('movies', JSON.stringify(moviesEnStorage));
            
            if (modal) modal.classList.remove('active');
            
            Swal.fire({
                title: '¡Película Seleccionada!',
                text: 'La película se ha guardado correctamente.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'tickets.html';
            });

        } catch (error) {
            console.error('Error al guardar la película seleccionada en localStorage:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al seleccionar la película. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    }

    cargarPeliculasParaSeleccion();
});