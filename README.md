# Cine Unidos - Prototipo Front-End

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Prototipo front-end para un sitio web de cine llamado 'Cine Unidos'. Implementa características clave como navegación de películas, autenticación de usuarios (login/registro), selección de películas y visualización de tickets, desarrollado con HTML, CSS y JavaScript vanilla.

## Características Principales

*   **Página de inicio:** Muestra películas destacadas en un slider interactivo (`peliculas.js`).
*   **Autenticación de usuarios:**
    *   Formularios de Login y Registro en modales (`sesion.js`).
    *   Usa `localStorage` para simular sesiones y almacenar datos básicos del usuario.
    *   Actualiza dinámicamente el header mostrando el estado de login y mensaje de bienvenida.
*   **Selector de películas:**
    *   Carrusel interactivo (`seleccionador.js`) permite a usuarios autenticados navegar y seleccionar películas.
    *   Requiere autenticación previa para acceder a la selección.
*   **Visualización de tickets:**
    *   Página dedicada (`tickets.html`) que muestra dinámicamente los detalles de la película seleccionada y la información del usuario.
    *   Presenta la información en un diseño moderno de ticket (`tickets.js`).
*   **Diseño Responsive:** El layout se adapta a diferentes tamaños de pantalla utilizando media queries en CSS.

## Tecnologías Utilizadas

*   **HTML5:** Para la estructuración semántica de las páginas web.
*   **CSS3:** Para estilos visuales, layout (incluyendo Flexbox/Grid), animaciones y diseño responsive.
    *   Google Fonts (`Lato`, `Bebas Neue`, `Alfa Slab One`) para la tipografía.
*   **JavaScript (ES6+ Vanilla):** Para la manipulación del DOM, manejo de eventos, interacción con modales, sliders/carruseles y gestión de `localStorage`.
*   **`localStorage`:** Utilizado para almacenamiento simple en el lado del cliente para persistir el estado de inicio de sesión y los datos de la película seleccionada entre cargas de página (con fines demostrativos).

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/robertgriman1702/preentrega2.git
    ```
2.  **Navega al directorio del proyecto:**
    ```bash
    cd preentrega2
    ```
3.  **Abre el archivo `index.html` en tu navegador web:**
    *   Haz clic derecho en `index.html` y selecciona "Abrir con" tu navegador preferido (Chrome, Firefox, etc.).
    *   Opcionalmente, usa un servidor local simple o una extensión de navegador como "Live Server" para VS Code para una mejor experiencia de desarrollo (aunque no es estrictamente necesario).

No se requieren pasos complejos de compilación ni dependencias, ya que es un proyecto front-end estático.

## Uso

1.  Abre la página `index.html`.
2.  Haz clic en el botón "Iniciar Sesión" en el encabezado.
3.  Si no tienes una cuenta, haz clic en "Regístrate" en el modal, completa los detalles y regístrate. Serás devuelto al formulario de inicio de sesión.
4.  Inicia sesión con las credenciales con las que te registraste. El encabezado se actualizará con un mensaje de bienvenida.
5.  Desplázate hacia abajo hasta la sección "Tickets" y haz clic en el botón "Escoge la película".
6.  Navega por las películas usando el carrusel en el modal selector.
7.  Una vez que hayas elegido una película, haz clic en el botón "Seleccionar y Comprar".
8.  Serás redirigido a la página `tickets.html`, que mostrará tu entrada virtual con los detalles de la película seleccionada y tu nombre de usuario.

## Estructura del Proyecto

preentrega2
├── css/
│ └── estilos.css # Estilos principales (Asegúrate que el nombre sea correcto)
├── img/
│ └── ... # Imágenes del proyecto (posters, placeholders, etc.)
├── js/
│ ├── en
│ ├── seleccionador.js # Lógica del modal/carrusel selector de películas
│ ├── sesion.js # Lógica de autenticación y estado de usuario
│ └── tic
├── index.html # Página principal (Homepage)
├── tickets.html # Ver página
└── README.md # Este archivo de documentación

*(Nota: Verifica que el nombre de tu archivo CSS sea `estilos.css` como se indica en el texto; si es `style.css`, actualiza la estructura).*

## Limitaciones Conocidas

*   **Seguridad en Autenticación:** El sistema de autenticación actual utiliza `localStorage` para almacenar datos del usuario, incluyendo la contraseña (en el contexto de la demo). **Esto NO es seguro para entornos de producción.** Los datos sensibles nunca deben almacenarse directamente en `localStorage`. Esta implementación es puramente con fines de demostración front-end. Una aplicación real requeriría un backend seguro y una base de datos para la gestión y autenticación de usuarios.
*   **Datos Estáticos:** Toda la información de las películas está codificada directamente en el HTML. Una aplicación real obtendría estos datos desde una API de backend.
*   **Sin Funcionalidad Backend:** Características como la compra real de tickets, selección de asientos, gestión de horarios, etc., no están implementadas ya que requieren lógica de backend.

## Mejoras Futuras (Potenciales)

*   Integración con un backend (ej., Node.js/Express, Python/Django/Flask) para una gestión adecuada de datos y seguridad.
*   Implementar autenticación de usuarios segura usando JWT o sesiones.
*   Obtener datos de películas dinámicamente desde una API (como TMDB o un backend personalizado).
*   Añadir funcionalidad de selección de asientos.
*   Integrar una simulación de pasarela de pagos.

## Licencia

Distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información (si añades uno).
