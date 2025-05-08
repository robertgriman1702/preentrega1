document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.main-content .slider-track');
    const prevBtn = document.querySelector('.main-content .prev-slide');
    const nextBtn = document.querySelector('.main-content .next-slide');
    const dotsContainer = document.querySelector('.main-content .slider-dots');

    let currentIndex = 0;
    let totalSlides = 0;
    let peliculasCargadas = [];

    async function cargarPeliculasParaSlider() {
        try {
            const response = await fetch('data/peliculas.json');
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            peliculasCargadas = await response.json();
            if (peliculasCargadas.length > 0) {
                renderizarSlides();
                totalSlides = peliculasCargadas.length;
                if (prevBtn && nextBtn && dotsContainer && track) {
                    prevBtn.addEventListener('click', prevSlide);
                    nextBtn.addEventListener('click', nextSlide);
                    createDots();
                    updateSlider();
                } else {
                    console.warn("Algunos elementos del slider principal no fueron encontrados.");
                    if(prevBtn) prevBtn.style.display = 'none';
                    if(nextBtn) nextBtn.style.display = 'none';
                    if(dotsContainer) dotsContainer.style.display = 'none';
                }
            } else {
                if (track) track.innerHTML = '<p>No hay películas disponibles en este momento.</p>';
                if(prevBtn) prevBtn.style.display = 'none';
                if(nextBtn) nextBtn.style.display = 'none';
                if(dotsContainer) dotsContainer.style.display = 'none';
            }
        } catch (error) {
            console.error('Error al cargar las películas para el slider:', error);
            if (track) track.innerHTML = '<p>Error al cargar películas. Intente más tarde.</p>';
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
            if(dotsContainer) dotsContainer.style.display = 'none';
        }
    }

    function renderizarSlides() {
        if (!track) return;
        track.innerHTML = '';
        peliculasCargadas.forEach(pelicula => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('slide');
            slideDiv.innerHTML = `
                <div class="img-container">
                    <img src="${pelicula.imagenUrl}" alt="${pelicula.titulo}" class="slide-img" loading="lazy">
                </div>
                <div class="slide-overlay">
                    <h3 class="slide-title">${pelicula.titulo}</h3>
                    <p class="slide-info">${pelicula.duracion} | ★ ${pelicula.rating} | ${pelicula.genero}</p>
                </div>
            `;
            track.appendChild(slideDiv);
        });
    }

    function updateSlider() {
        if (!track || totalSlides === 0) return;
        const percentage = -(currentIndex * 100);
        track.style.transform = `translateX(${percentage}%)`;
        updateDots();
    }

    function updateDots() {
        if (!dotsContainer || totalSlides === 0) return;
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
            return;
        }
        currentIndex = index;
        updateSlider();
    }

    function prevSlide() {
        if (totalSlides === 0) return;
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        updateSlider();
    }

    function nextSlide() {
        if (totalSlides === 0) return;
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }

    function createDots() {
        if (!dotsContainer || totalSlides === 0) return;
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

    cargarPeliculasParaSlider();
});