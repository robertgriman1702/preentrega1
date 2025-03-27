import obtenerUser from './sesion.js';
import { verificarUser, convertirNumero } from './compra.js';

const peliculas = [
    {
        id: 1,
        titulo: "Mickey 17",
        descripcion: "Mickey 17, la decimoséptima iteración de Mickey, tiene la tarea de capturar la forma de vida similar a una oruga de Niflheim para su análisis. Mickey 17 cae en una fisura en el hielo, fuera del alcance de Timo, quien se va y reporta la muerte de Mickey 17.",
        genero: "Ciencia ficción",
    },
    {
        id: 2,
        titulo: "Capitán América: Un nuevo mundo",
        descripcion: "Tras reunirse con el recientemente electo presidente de los Estados Unidos Thaddeus Ross, Sam se encuentra en medio de un conflicto internacional.",
        genero: "Acción",
    },
    {
        id: 3,
        titulo: "Flow",
        descripcion: "Un gato se despierta en un mundo cubierto de agua, donde la raza humana parece haber desaparecido.",
        genero: "Aventura",
    },
    {
        id: 4,
        titulo: "Sonic 3",
        descripcion: "Una aventura llena de acción con Sonic y sus amigos.",
        genero: "Aventura",
    },
];

function mostrarPeliculas() {
    console.log("Películas disponibles:");
    peliculas.forEach(pelicula => {
        console.log(`
    Opción #${pelicula.id}
    Título: ${pelicula.titulo}
    Descripción: ${pelicula.descripcion}
    Género: ${pelicula.genero}
    ----------------------------`);
    });
}

function seleccionarPelicula() {
    mostrarPeliculas();
    
    while (true) {
        const eleccion = convertirNumero("Ingrese el número de ID de la película que escogió:");
        
        // Si el usuario cancela
        if (eleccion === null) {
            console.log("Selección cancelada por el usuario");
            return null;
        }
        
        const peliculaSeleccionada = peliculas.find(p => p.id === eleccion);
        
        if (peliculaSeleccionada) {
            alert(`Ha seleccionado: "${peliculaSeleccionada.titulo}"`);
            return peliculaSeleccionada;
        } else {
            alert("ID no válido. Las opciones son: 1, 2, 3 o 4");
        }
    }
}

const botonSeleccionar = document.getElementById("seleccionar");

botonSeleccionar.addEventListener("click", function() {
    const user = obtenerUser();
    if (!verificarUser(user)) {
        return;
    }
    
    const peliculaElegida = seleccionarPelicula();
    if (peliculaElegida) {
        console.log("Película seleccionada:", peliculaElegida);
    }
});