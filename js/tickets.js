document.addEventListener('DOMContentLoaded', () => {
    const poster = document.getElementById('ticket-poster-img');
    const title = document.getElementById('ticket-movie-title');
    const duracion = document.getElementById('ticket-duration');
    const rating = document.getElementById('ticket-rating');
    const genre = document.getElementById('ticket-genre');
    const usuario = document.getElementById('ticket-user-name');
    const qrContainer = document.getElementById('qr-code');

    const movies = JSON.parse(localStorage.getItem('movies'));
    const lastMovie = movies[movies.length - 1];
    const user = JSON.parse(localStorage.getItem('userData'));

    if (lastMovie) {
        poster.src = lastMovie.image;
        title.textContent = lastMovie.title;
        duracion.textContent = lastMovie.duration ? `${lastMovie.duration} min` : '-- min';
        rating.textContent = lastMovie.rating ? `★ ${lastMovie.rating}` : '★ --';
        genre.textContent = lastMovie.genre || '--';
    } else {
        console.log("No movies found in localStorage.");
    }
    if (user) {
        usuario.textContent = user.nombre;
    }

});
